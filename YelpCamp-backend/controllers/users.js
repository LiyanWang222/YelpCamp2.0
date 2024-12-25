const User = require('../models/user');


module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            res.status(201).json({ message: 'Welcome to Yelp Camp!', user: registeredUser });
        });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

module.exports.login = (req, res) => {
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.json({ message: 'Welcome back!', redirectUrl, user: req.user }); // 返回用户信息和重定向URL
};

module.exports.logout = (req, res) => {
    req.logout(err => {
        if (err) {
            return res.status(500).json({ error: 'Logout failed' });
        }
        res.json({ message: 'Goodbye!' });
    });
};