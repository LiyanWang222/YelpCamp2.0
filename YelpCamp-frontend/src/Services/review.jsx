import api from './api';

// 创建评论
export const createReview = async (campgroundId, reviewData) => {
    try {
        const response = await api.post(`/campgrounds/${campgroundId}/reviews`, reviewData);
        // 返回创建的评论和消息
        return response.data;
    } catch (error) {
        console.error(`Creating review for campground ${campgroundId} failed:`, error);
        throw error;
    }
};

// 删除评论
export const deleteReview = async (campgroundId, reviewId) => {
    try {
        const response = await api.delete(`/campgrounds/${campgroundId}/reviews/${reviewId}`);
        // 返回成功删除的消息
        return response.data;
    } catch (error) {
        console.error(`Deleting review ${reviewId} for campground ${campgroundId} failed:`, error);
        throw error;
    }
};

export default {
    createReview,
    deleteReview,
};