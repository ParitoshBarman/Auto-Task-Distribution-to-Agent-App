const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.registerUser = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashedPassword,
            role: role || 'agent'  // default to 'agent' if not provided
        });

        res.status(201).json({ message: 'User registered successfully', userId: user._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Registration failed' });
    }
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: 'User not found' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });

    user.password = null;

    res.json({ token, role: user.role, user });
};