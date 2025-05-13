const express = require('express');  
const router = express.Router();  
const Task = require('../models/Task');  
const authMiddleware = require('../middleware/auth');  

router.use(authMiddleware); // Protect all routes below...  

router.post('/', async (req, res) => {  
    const { text, dueDate, priority } = req.body;  
    const task = new Task({  
        userId: req.user.id,  
        text,  
        dueDate,  
        priority,  
    });  
    try {  
        const savedTask = await task.save();  
        res.status(201).json(savedTask);  
    } catch (error) {  
        res.status(400).json({ error: error.message });  
    }  
});  

router.get('/', async (req, res) => {  
    try {  
        const tasks = await Task.find({ userId: req.user.id });  
        res.json(tasks);  
    } catch (error) {  
        res.status(500).json({ error: error.message });  
    }  
});  

// Additional routes for edit/delete could be added here  

module.exports = router;