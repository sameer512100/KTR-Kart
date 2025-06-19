const User = require('../models/userM');
const Blacklist = require('../models/blacklistM'); // if you’re using token blacklisting
const { validationResult } = require('express-validator');

// Register user
module.exports.registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password, hostel, phone, room } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const user = new User({
            name,
            email,
            password, // auto-hashed via pre-save hook
            hostel,
            phone,
            room
        });

        await user.save();

        const token = await user.generateAuthToken();

        res.status(201).json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                hostel: user.hostel,
                phone: user.phone,
                room: user.room
            }
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Login user
module.exports.loginUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = await user.generateAuthToken();

        // Set cookie (add secure/sameSite in production)
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            // secure: process.env.NODE_ENV === 'production',
            // sameSite: 'strict'
        });

        res.status(200).json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                hostel: user.hostel,
                phone: user.phone,
                room: user.room
            }
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get logged-in user profile
module.exports.getProfile = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    res.status(200).json({ user: req.user });
};

// Logout user
module.exports.logoutUser = async (req, res) => {
    try {
        const token =
            req.cookies?.token ||
            (req.headers.authorization && req.headers.authorization.split(' ')[1]);
        if (token && Blacklist) {
            await Blacklist.create({ token });
        }

        res.clearCookie('token');
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};