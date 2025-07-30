const Task = require('../models/Task');
const Agent = require('../models/Agent');
const csv = require('csv-parser');
const fs = require('fs');

exports.uploadCSV = async (req, res) => {
    const file = req.file;
    

    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    const agents = await Agent.find();
    if (agents.length < 1) return res.status(400).json({ message: 'No agents found' });

    const items = [];

    fs.createReadStream(file.path)
        .pipe(csv())
        .on('data', (row) => {
            if (row.FirstName && row.Phone && row.Notes) {
                items.push(row);
            }
        })
        .on('end', async () => {
            const totalAgents = agents.length;
            for (let i = 0; i < items.length; i++) {
                const agent = agents[i % totalAgents];
                await Task.create({
                    firstName: items[i].FirstName,
                    phone: items[i].Phone,
                    notes: items[i].Notes,
                    agent: agent._id,
                });
            }

            fs.unlinkSync(file.path); // Delete after processing
            res.json({ message: 'CSV processed and tasks assigned' });
        });
};

exports.getAgentTasks = async (req, res) => {
    const tasks = await Task.find({ agent: req.params.id });
    res.json(tasks);
};