const Campground = require('../models/campground');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    try {
        const campground = await Campground.findById(req.params.id);
        const review = new Review(req.body.review);
        review.author = req.user._id;
        campground.reviews.push(review);
        await review.save();
        await campground.save();
        res.status(201).json({ message: 'Created new review!', review }); // 返回创建的评论
    } catch (error) {
        res.status(500).json({ error: 'Failed to create review' });
    }
};

module.exports.deleteReview = async (req, res) => {
    try {
        const { id, reviewId } = req.params;
        await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
        await Review.findByIdAndDelete(reviewId);
        res.json({ message: 'Successfully deleted review' }); // 返回成功删除消息
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete review' });
    }
};