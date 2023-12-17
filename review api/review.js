//create new review
// api/v1/review
exports.createCourseReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, CourseId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const course = await course.findById(CourseId);
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
    course.review.push(review);
    course.numofReviews = product.review.length;
  }
  course.ratings =
    course.review.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;
  await course.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});
