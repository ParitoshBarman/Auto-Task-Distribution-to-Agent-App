const express = require('express');
const router = express.Router();
const { uploadCSV, getAgentTasks } = require('../controllers/csvController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware')


router.post('/upload', protect, authorizeRoles('admin'), upload.single('file'), uploadCSV);
router.get('/agent/:id', protect, authorizeRoles('admin', 'agent'), getAgentTasks);

module.exports = router;