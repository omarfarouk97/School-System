const mongoose = require("mongoose");

const Message = require("../models/message");
const Teacher = require("../models/teacher");

const sendMessage = async (req, res, next) => {
  let { message, recieverID } = req.body;
  recieverID = recieverID.split(",");
  const newMessage = new Message({ message, recieverID });

  //const sender = Teacher.findById(senderID);
  //console.log(sender.name);
  for (oneId of recieverID) {
    //console.log(oneId);
    let reciever = await Teacher.findById(oneId);
    console.log(reciever);
    console.log(newMessage);
    if (!reciever) {
      continue;
    } else {
      try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        reciever.messages.push(newMessage);
        await reciever.save({ session: sess });
        // message.recieverID.push(reciever);
        await newMessage.save({ session: sess });
        await sess.commitTransaction();
      } catch (err) {
        return next(err);
      }
    }
  }
  //tried to save the message for the sender here but failed for some reason

  //   try {
  //     const sess = await mongoose.startSession();
  //     sess.startTransaction();
  //     console.log(sender);
  //     sender.messages.push(newMessage);
  //     await sender.save({ session: sess });
  //     //message.senderID.push(sender);
  //     // await newMessage.save({ session: sess });
  //     await sess.commitTransaction();
  //   } catch (err) {
  //     return next(err);
  //   }
  res.json({ message: "message sent." });
};

exports.sendMessage = sendMessage;
