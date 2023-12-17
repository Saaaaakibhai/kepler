const Course = require("../models/course");
//create new product => /api/v1/product/new
exports.newCourse = async (req, res, next) => {
  const course = await Course.create(res.body);
  res.status(201).json({
    success: true,
    course,
  });
};
exports.getCourses = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "This route will show all courses in database.",
  });
};
