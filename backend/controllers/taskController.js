const Task = require('../models/Task');

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

module.exports = getTasksByAgent;
