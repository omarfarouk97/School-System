const express = require("express");

const teacherController = require("../controllers/teacher-controller");

const router = express.Router();

router.post("/teacher/add", teacherController.addTeacher);
router.post("/teacher/assign", teacherController.assignTeacher);

module.exports = router;
