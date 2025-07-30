const Task = require('../models/Task');
const User = require('../models/User')
const Agent = require('../models/Agent')

const getTasksByAgent = async (req, res) => {
    try {
        const agentId = req.params.agentId;

        // Get tasks assigned to the agent
        // const tasks = await Task.find({ agent: agentId }).populate('agent', 'name email phone');
        const tasks = await Task.find({ agent: agentId })

        // Count total tasks
        const taskCount = tasks.length;

        res.json({
            count: taskCount,
            tasks
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};



const getMyTasks = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId)
        const agent = await Agent.findOne({ email: user.email })

        const tasks = await Task.find({ agent: agent._id });

        res.json({
            count: tasks.length,
            tasks
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


module.exports = { getTasksByAgent, getMyTasks };
