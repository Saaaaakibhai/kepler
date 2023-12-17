const express = require("express");
const router = express.Router();

const {
  getCourses,
  newProduct,
  newCourse,
} = require("../controllers/courseController");

// const {
//     createCourseReview,
// }

router.route("/courses").get(getCourses);
router.route("/course/new").post(newCourse);

router.route("/review").put(isAuthenticatedUser, createProductReview);

module.exports = router;
