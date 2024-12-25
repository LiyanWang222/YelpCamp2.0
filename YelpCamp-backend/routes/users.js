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
            // 登录成功，返回用户信息
            return res.status(200).json({ message: 'Login successful', user: { id: user._id, username: user.username } });
        });
    })(req, res, next);
});

router.post('/logout', users.logout); // 用户登出

// 获取当前已登录的用户信息
router.get('/me', isLoggedIn, (req, res) => {
    res.json(req.user); // 返回当前登录的用户数据
});

module.exports = router;