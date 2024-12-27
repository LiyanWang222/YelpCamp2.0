import axios from 'axios';
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL, // 从环境变量读取 后端 API 基础 URL
    timeout: 100000, // 请求超时设置
    withCredentials: true, // 允许发送和接收 cookie，用于会话管理
});

export const fetchCampgrounds = () => api.get('/campgrounds');
export const createCampground = (data) => api.post('/campgrounds', data);
export const fetchCurrentUser = () => api.get('/users/me');
export const login = (credentials) => api.post('/users/login', credentials);
export const logout = () => api.post('/users/logout');

export default api;