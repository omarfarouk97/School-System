const mongoose = require("mongoose");
const Teacher = require("../models/teacher");
const Course = require("../models/course");
//{"message":"hope it works",
// "senderID":"6232395b3dbca4746a877bbf",
// "recieverID":"623479751e1ba7716bf67470,6232395b3dbca4746a877bbf"}
const addTeacher = async (req, res, next) => {
  const { name, age } = req.body;
  const newTeacher = new Teacher({
    name,
    age,
    courses: [],
  });

  try {
    await newTeacher.save();
  } catch (err) {
    return next(err);
  }
  res.json({ newTeacher: newTeacher.name });
};
const assignTeacher = async (req, res, next) => {
  const { title, name } = req.body;
  let teacher = await Teacher.find({ name });
  let course = await Course.find({ title: title });
  console.log(course[0]);
  if (!teacher || !course) {
    res.json({
      message:
        "invalid inputs, make sure to enter teacher's name and course's title correctly.",
    });
    return;
  }
  teacher = teacher[0];
  course = course[0];
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    course.teachers.push(teacher);
    await course.save({ session: sess });
    teacher.courses.push(course);
    await teacher.save({ session: sess });
    await sess.commitTransaction();
    res.json({ message: "teacher assigned to the course" });
  } catch (err) {
    return next(err);
  }
};
exports.addTeacher = addTeacher;
exports.assignTeacher = assignTeacher;
