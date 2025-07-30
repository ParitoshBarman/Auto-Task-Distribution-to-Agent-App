const Agent = require('../models/Agent');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.createAgent = async (req, res) => {
    const { name, email, mobile, password } = req.body;

    const existing = await Agent.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Agent already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        password: hashedPassword,
        role: 'agent'
    });

    const agent = await Agent.create({ name, email, mobile, password: hashedPassword, userId: user._id });

    res.status(201).json(agent);
};

exports.getAgents = async (req, res) => {
    const agents = await Agent.find().select("-password");
    res.json(agents);
};
