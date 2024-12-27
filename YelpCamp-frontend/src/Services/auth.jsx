// services/auth.js
import api from './api';

// 用户登录
export const login = async (formData) => {
    try {
        const response = await api.post('/users/login', formData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log('Response Headers:', response.headers);
        console.log('Response Data:', response.data);
        return response.data; // 返回用户数据
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Login failed');
    }
};

// 用户登出
export const logout = async () => {
    try {
        await api.post('/users/logout');
    } catch (error) {
        throw new Error('Logout failed');
    }
};

// 用户注册
export const register = async (formData) => {
    try {
        const response = await api.post('/users/register', formData, {
            headers: {
                'Content-Type': 'application/json',
            } });
        return response.data; // 返回用户数据
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Registration failed');
    }
};

// 获取当前已登录的用户信息
export const fetchCurrentUser = async () => {
    try {
        const response = await api.get('/users/me');
        return response.data; // 返回用户数据
    } catch (error) {
        throw new Error('Failed to fetch current user');
    }
};