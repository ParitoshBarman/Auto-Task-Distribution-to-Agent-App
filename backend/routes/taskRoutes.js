const express = require('express');
const { getTasksByAgent, getMyTasks } = require('../controllers/taskController')
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();


router.get('/my', protect, authorizeRoles('agent'), getMyTasks);
router.get('/:agentId', protect, authorizeRoles('admin'), getTasksByAgent);

module.exports = router;