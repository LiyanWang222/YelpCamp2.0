import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001', // 设置你的后端 API 基础 URL
    timeout: 100000, // 请求超时设置
    withCredentials: true, // 允许发送和接收 cookie，用于会话管理
});

export const fetchCampgrounds = () => api.get('/campgrounds');
export const createCampground = (data) => api.post('/campgrounds', data);
export const fetchCurrentUser = () => api.get('/users/me');
export const login = (credentials) => api.post('/users/login', credentials);
export const logout = () => api.post('/users/logout');

export default api;