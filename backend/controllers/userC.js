const userModel = require('../models/userM');
const userService = require('../services/userService');
const { validationResult } = require('express-validator');
const Blacklist = require('../models/blacklistM');

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }    
    const { fullname, email, password } = req.body;
    const { firstname, lastname } = fullname;
    const isUserExists = await userModel.findOne({ email });
    if (isUserExists) {
        return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname:fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = await user.generateAuthToken();
    res.status(201).json({ token, user });
};

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email,password} = req.body;
    const user = await userModel.findOne({ email}).select('+password');
    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = await user.generateAuthToken();

    res.cookie('token',token);
    res.status(200).json({ token, user });
};

module.exports.getProfile = async (req, res, next) => {
    return res.status(200).json({ user: req.user });
}; 

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1]; 

    await Blacklist.create({ token });
    res.status(200).json({ message: 'Logged out successfully' });
}