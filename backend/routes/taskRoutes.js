const express = require('express');
const getTasksByAgent = require('../controllers/taskController')
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();


router.get('/:agentId', protect, authorizeRoles('admin'), getTasksByAgent);

module.exports = router;