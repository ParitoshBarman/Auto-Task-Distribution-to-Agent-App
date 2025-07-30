const express = require('express');
const { getTasksByAgent, getMyTasks } = require('../controllers/taskController')
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();


router.get('/:agentId', protect, authorizeRoles('admin'), getTasksByAgent);
router.get('/my', getMyTasks);

module.exports = router;