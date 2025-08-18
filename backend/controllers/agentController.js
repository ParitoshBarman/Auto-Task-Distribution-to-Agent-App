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

    const agent = await Agent.create({ name, email, mobile, password: hashedPassword, userId: user._id, createdBy:req.user.id });

    res.status(201).json(agent);
};

exports.getAgents = async (req, res) => {
    let agents;
    if (req.user.role == "admin") {
        agents = await Agent.find().select("-password");
    }
    else {
        agents = await Agent.find({ createdBy: req.user.id }).select("-password");
    }
    res.json(agents);
};



// Update Agent
exports.updateAgent = async (req, res) => {
    try {
        const { id } = req.params; // agent id
        const { name, email, mobile, password } = req.body;

        let agent = await Agent.findById(id);
        if (!agent) return res.status(404).json({ message: "Agent not found" });

        // Check permission
        // if (req.user.role !== "admin" && agent.userId.toString() !== req.user.id) {
        //     return res.status(403).json({ message: "Not authorized to update this agent" });
        // }

        // Update fields
        if (name) agent.name = name;
        if (email) agent.email = email;
        if (mobile) agent.mobile = mobile;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            agent.password = hashedPassword;

            // also update password in User table
            await User.findByIdAndUpdate(agent.userId, { password: hashedPassword });
        }

        await agent.save();

        res.json({ message: "Agent updated successfully", agent });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Delete Agent
exports.deleteAgent = async (req, res) => {
    try {
        const { id } = req.params;

        let agent = await Agent.findById(id);
        if (!agent) return res.status(404).json({ message: "Agent not found" });

        // Check permission
        // if (req.user.role !== "admin" && agent.userId.toString() !== req.user.id) {
        //     return res.status(403).json({ message: "Not authorized to delete this agent" });
        // }

        // Delete agent and corresponding user
        await User.findByIdAndDelete(agent.userId);
        await Agent.findByIdAndDelete(id);

        res.json({ message: "Agent deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
