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



// ✅ Update a Task
const updateTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const updatedData = req.body; // pass { title, description, status, etc. }

        const task = await Task.findByIdAndUpdate(taskId, updatedData, { new: true });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json({
            message: 'Task updated successfully',
            task
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// ✅ Delete a Task
const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;

        const task = await Task.findByIdAndDelete(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


module.exports = { getTasksByAgent, getMyTasks, updateTask, deleteTask };
