const express = require('express');
const { getTasksByAgent, getMyTasks, updateTask, deleteTask } = require('../controllers/taskController')
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();


router.get('/my', protect, authorizeRoles('admin', 'agent'), getMyTasks);
router.get('/:agentId', protect, authorizeRoles('admin', 'agent'), getTasksByAgent);

// Update a task
router.put('/:taskId', protect, authorizeRoles('admin', 'agent'), updateTask);
// Delete a task
router.delete('/:taskId', protect, authorizeRoles('admin', 'agent'), deleteTask);

module.exports = router;