const express = require('express');
const router = express.Router();
const authController = require('../controllers/userC');
const authMiddleware = require('../middleware/authMiddleware');
const { body } = require('express-validator');

// =======================
//     AUTH ROUTES
// =======================

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post(
    '/register',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters'),
        body('hostel').notEmpty().withMessage('Hostel is required'),
        body('phone')
            .matches(/^[6-9]\d{9}$/)
            .withMessage('Phone must be a valid 10-digit number'),
        body('room').notEmpty().withMessage('Room number is required')
    ],
    authController.registerUser
);

// @route   POST /api/auth/login
// @desc    Login existing user
// @access  Public
router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').notEmpty().withMessage('Password is required')
    ],
    authController.loginUser
);

// @route   GET /api/auth/profile
// @desc    Get user profile (requires auth)
// @access  Private
router.get('/profile', authMiddleware, authController.getProfile);

// @route   POST /api/auth/logout
// @desc    Logout user (adds token to blacklist)
// @access  Private
router.post('/logout', authMiddleware, authController.logoutUser);

module.exports = router;