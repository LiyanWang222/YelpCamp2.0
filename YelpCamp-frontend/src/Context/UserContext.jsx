import React, { createContext, useState, useEffect } from 'react';
import { login as authLogin, logout as authLogout, register as authRegister, fetchCurrentUser } from '../Services/auth';

// 创建 UserContext
export const UserContext = createContext();

// 创建 UserProvider 组件
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // 用户状态
    const [loading, setLoading] = useState(false); // 全局加载状态
    const [error, setError] = useState(null); // 全局错误状态

    // 在组件加载时获取当前用户
    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const userData = await fetchCurrentUser();
                setUser(userData); // 设置用户状态
            } catch (error) {
                setUser(null); // 未登录状态
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    // 用户登录函数
    const login = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const userData = await authLogin(formData);
            setUser(userData); // 登录成功后设置用户状态
            console.log('User updated:', userData);
        } catch (error) {
            setError(error.message); // 设置错误信息
        } finally {
            setLoading(false);
        }
    };

    // 用户注册函数
    const register = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const userData = await authRegister(formData);
            setUser(userData); // 注册成功后设置用户状态
        } catch (error) {
            setError(error.message); // 设置错误信息
        } finally {
            setLoading(false);
        }
    };

    // 用户登出函数
    const logout = async () => {
        setLoading(true);
        setError(null);
        try { 
            setUser(null); // 登出成功后清除用户状态
            
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <UserContext.Provider value={{ user, loading, error, login, logout, register }}>
            {children}
        </UserContext.Provider>
    );
};