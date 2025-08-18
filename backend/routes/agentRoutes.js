const express = require('express');
const router = express.Router();
const { createAgent, getAgents, updateAgent, deleteAgent } = require('../controllers/agentController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/create', protect, authorizeRoles('admin', 'agent'), createAgent);
router.get('/', protect, authorizeRoles('admin', 'agent'), getAgents);
router.put("/:id", protect, updateAgent);
router.delete("/:id", protect, deleteAgent);

module.exports = router;