const express = require("express");

const courseController = require("../controllers/course-controller");
const router = express.Router();

router.post("/course/create", courseController.createCourse);
router.post("/course/assign", courseController.assignCourse);

module.exports = router;
