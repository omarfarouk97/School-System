const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  message: { type: String, required: true },
  recieverID: [
    { type: mongoose.Types.ObjectId, required: false, ref: "Teacher" },
  ],
  senderID: [
    { type: mongoose.Types.ObjectId, required: false, ref: "Teacher" },
  ],
});

module.exports = mongoose.model("Message", messageSchema);
