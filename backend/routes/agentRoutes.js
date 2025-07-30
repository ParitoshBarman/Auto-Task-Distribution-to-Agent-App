const express = require('express');
const router = express.Router();
const { createAgent, getAgents } = require('../controllers/agentController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/create', protect, authorizeRoles('admin'), createAgent);
router.get('/', protect, authorizeRoles('admin'), getAgents);

module.exports = router;