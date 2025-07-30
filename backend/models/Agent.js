const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    mobile: String,
    password: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Agent', agentSchema);