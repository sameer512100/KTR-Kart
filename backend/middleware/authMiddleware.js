const jwt = require('jsonwebtoken');
const User = require('../models/userM');
const Blacklist = require('../models/blacklistM'); // if you're using token blacklist

const authMiddleware = async (req, res, next) => {
    try {
        // Get token from cookie or Authorization header
        const token =
            req.cookies?.token ||
            (req.headers.authorization && req.headers.authorization.split(' ')[1]);

        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        // Check if token is blacklisted
        if (Blacklist) {
            const isBlacklisted = await Blacklist.findOne({ token });
            if (isBlacklisted) {
                return res.status(401).json({ error: 'Token is blacklisted. Please login again.' });
            }
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        req.user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            hostel: user.hostel,
            phone: user.phone,
            room: user.room
        };

        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;