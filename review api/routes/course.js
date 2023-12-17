const express = require("express");
const router = express.Router();

// const {
//   getCourses,
//   newProduct,
//   newCourse,
// } = require("../controllers/courseController");

const {
  getCourses,
  newCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  createCourseReview,
  getCourseReviews,
  deleteReview,
} = require("../controllers/courseController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/courses").get(getCourses);
router.route("/course/:id").get(getSingleCourse);

// router.route("/course/new").post(newCourse);
router
  .route("admin/course/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);
router
  .route("/admin/course/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateCourse)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCourse);

router.route("/review").put(isAuthenticatedUser, createCourseReview);
router.route("/review").get(isAuthenticatedUser, getCourseReviews);
router.route("/review").delete(isAuthenticatedUser, deleteReview);

module.exports = router;
