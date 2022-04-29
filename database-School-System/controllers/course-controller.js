const Course = require("../models/course");

const mongoose = require("mongoose");
const Teacher = require("../models/teacher");

const createCourse = async (req, res, next) => {
  const { title, description, teachers } = req.body;

  const createdCourse = new Course({
    title,
    description,
    teachers: teachers ? teachers : [],
  });

  let teacher;
  //searching in Database Document if there is any teacher
  //with entered id //side note: when creating a course one teacher only or none can be assigned
  try {
    teacher = await Teacher.findById(teachers);
  } catch (error) {
    return next(error);
  }
  //will save createdcourse directly if there is no teacher found
  if (!teacher) {
    try {
      await createdCourse.save();
    } catch (err) {
      return next(err);
    }
    res.json({ course: createdCourse });
  } else {
    //starting session to save new course and update courses array for teacher
    try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await createdCourse.save({ session: sess });
      teacher.courses.push(createdCourse);
      await teacher.save({ session: sess });
      await sess.commitTransaction();
    } catch (err) {
      return next(err);
    }
    res.json({ course: createdCourse });
  }
};
const assignCourse = async (req, res, next) => {
  //assuming teacher's and course's objectID are what used to assign the course
  const { teacherID, courseID } = req.body;
  if (!teacherID || !courseID) {
    res.json({ message: "invalid inputs, couldnt assign course." });
    return;
  }
  let teacher = await Teacher.findById(teacherID);
  let course = await Course.findById(courseID);
  console.log(teacherID);
  console.log(course);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    course.teachers.push(teacher);
    await course.save({ session: sess });
    teacher.courses.push(course);
    await teacher.save({ session: sess });
    await sess.commitTransaction();
    res.json({ message: "course assigned" });
  } catch (err) {
    return next(err);
  }
};

exports.createCourse = createCourse;
exports.assignCourse = assignCourse;
