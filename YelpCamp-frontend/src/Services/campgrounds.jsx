import api from './api';

export const getCampgrounds = async () => {
    try {
        const response = await api.get('/campgrounds');
        return response.data;
    } catch (error) {
        console.error('Fetching campgrounds failed:', error);
        throw error;
    }
};

export const getCampground = async (id) => {
    try {
        const response = await api.get(`/campgrounds/${id}`);
        console.log('Response:', response); // 打印整个响应
        console.log('Response Headers:', response.headers); // 打印响应头
        console.log('Request Headers:', response.config.headers); // 打印请求头
        return response.data;
    } catch (error) {
        console.error(`Fetching campground ${id} failed:`, error);
        throw error;
    }
};

// 创建新的 Campground
export const createCampground = async (data) => {
    try {
        const response = await api.post('/campgrounds', data, {
            headers: {
                'Content-Type': 'multipart/form-data', // 确保支持文件上传
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating campground:', error);
        throw error;
    }
};

export const updateCampground = async (id, campgroundData) => {
    try {
        const response = await api.put(`/campgrounds/${id}`, campgroundData);
        return response.data;
    } catch (error) {
        console.error(`Updating campground ${id} failed:`, error);
        throw error;
    }
};

export const deleteCampground = async (id) => {
    try {
        await api.delete(`/campgrounds/${id}`);
    } catch (error) {
        console.error(`Deleting campground ${id} failed:`, error);
        throw error;
    }
};