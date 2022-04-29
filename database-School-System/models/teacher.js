const mongoose = require("mongoose");
const { stringify } = require("querystring");

const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: false },
  courses: [{ type: mongoose.Types.ObjectId, required: false, ref: "Course" }],
  messages: [
    { type: mongoose.Types.ObjectId, required: false, ref: "Message" },
  ],
});

module.exports = mongoose.model("Teacher", teacherSchema);
