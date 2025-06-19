const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, 'Name must be at least 3 characters long']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5 characters long'],
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false  // don't return password on queries by default
    },
    hostel: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit phone number']
    },
    room: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Generate JWT token
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign(
        { _id: user._id.toString() },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
    return token;
};

// Compare raw password with hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Static method to hash a password
userSchema.statics.hashPassword = async function (rawPassword) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(rawPassword, salt);
};

// Pre-save hook to hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await userSchema.statics.hashPassword(this.password);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;