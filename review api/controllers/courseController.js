//create new review => api/v1/review
exports.createCourseReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, CourseId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const course = await course.findById(CourseId);
  // console.log(course.reviews);

  const isReviewed = course.review.find(
    (r) => r.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.foreach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    course.reviews.push(review);
    course.numofReviews = product.reviews.length;
  }
  course.ratings =
    course.reviews.reduce((acc, item) => item.rating + acc, 0) /
    course.reviews.length;
  await course.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

//get all courses reviews => /api1/v1/reviews
exports.getCourseReviews = catchAsyncErrors(async (req, res, next) => {
  const course = await Course.findById(req.query.id);
  res.status(200).json({
    success: true,
    reviews: course.reviews,
  });
});

//delete courses review => /api1/v1/reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const course = await Course.findById(req.query.CourseId);
  const reviews = course.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );
  const numofReviews = reviews.length;
  course.ratings =
    course.reviews.reduce((acc, item) => item.rating + acc, 0) /
    course.reviews.length;
  await Course.findByIdAndUpdate(
    req.query.id,
    {
      reviews,
      rating,
      numofReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    //reviews: course.reviews,
  });
});

// const Course = require("../models/course");
// //create new course => /api/v1/course/new
// exports.newCourse = async (req, res, next) => {
//   const course = await Course.create(res.body);
//   res.status(201).json({
//     success: true,
//     course,
//   });
// };
// exports.getCourses = (req, res, next) => {
//   res.status(200).json({
//     success: true,
//     message: "This route will show all courses in database.",
//   });
// };
