const User = require('../Models/User'); 
const jwt = require('jsonwebtoken');

// Token Generate karne ka function
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register a new user (Admin, Host, Guard)
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
    const { name, email, password, role, phone } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({ name, email, password, role, phone });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Login User
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all users with 'host' role
// @route   GET /api/auth/hosts
const getHosts = async (req, res) => {
    try {
        const hosts = await User.find({ role: 'host' }).select('-password');
        res.json(hosts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- NAYE ADMIN FUNCTIONS YAHAN SE SHURU HAIN ---

// @desc    Get ALL users (Admin ke liye)
// @route   GET /api/auth/users
const getAllUsers = async (req, res) => {
    try {
        // Password hata kar saare users fetch karenge
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a user (Admin ke liye)
// @route   PUT /api/auth/users/:id
const updateUser = async (req, res) => {
    try {
        const { name, phone, role } = req.body;
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Sirf allowed fields update karenge (Email change nahi karne denge security ke liye)
        user.name = name || user.name;
        user.phone = phone || user.phone;
        user.role = role || user.role;

        const updatedUser = await user.save();

        // Password hide karke response bhejenge
        updatedUser.password = undefined;
        res.json({ message: 'User updated successfully', user: updatedUser });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a user (Admin ke liye)
// @route   DELETE /api/auth/users/:id
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Saare naye functions ko export kiya hai
module.exports = { registerUser, loginUser, getHosts, getAllUsers, updateUser, deleteUser };