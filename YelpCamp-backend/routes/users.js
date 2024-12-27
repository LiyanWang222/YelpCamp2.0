const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users');
const { isLoggedIn} = require('../middleware');
router.route('/register')
    .post(catchAsync(users.register)); // 用户注册

// 用户登录
router.post('/login', (req, res, next) => {
    console.log(req.body); // 调试日志：打印请求体
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error('Authentication error:', err); // 打印错误日志
            return next(err); // 将错误交给全局错误处理
        }
        if (!user) {
            return res.status(401).json({ error: info?.message || 'Invalid username or password' }); // 返回错误信息
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error('Login error:', err); // 打印登录错误日志
                return next(err); // 将错误交给全局错误处理
            }
            // 调试：打印 Cookie 和 Session 信息
            console.log('Session:', req.session);
            console.log('User Logged In:', user);
            // 登录成功，返回用户信息
            return res.status(200).json({ message: 'Login successful', user: { id: user._id, username: user.username } });
        });
    })(req, res, next);
});

router.post('/logout', users.logout); // 用户登出

// 获取当前已登录的用户信息
router.get('/me', isLoggedIn, (req, res) => {
    res.status(200).json({
        user: req.user, // 当前用户数据
        message: 'User information retrieved successfully'
    });
});
module.exports = router;