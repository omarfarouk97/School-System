const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  teachers: [
    { type: mongoose.Types.ObjectId, required: false, ref: "Teacher" },
  ],
});

module.exports = mongoose.model("Course", courseSchema);
