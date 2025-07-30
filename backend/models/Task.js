const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    firstName: String,
    phone: String,
    notes: String,
    agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
    status:{type:String, enum:['pending', 'complete'], default:'complete'}
});

module.exports = mongoose.model('Task', taskSchema);