const express = require('express');  
const router = express.Router();  
const User = require('../models/User');  
const bcrypt = require('bcrypt');  

router.post('/signup', async (req, res) => {  
    const { username, password } = req.body;  

    try {  
        const hashedPassword = await bcrypt.hash(password, 10);  
        const user = new User({ username, password: hashedPassword });  
        await user.save();  
        res.status(201).json({ message: 'User created!' });  
    } catch (error) {  
        res.status(400).json({ error: error.message });  
    }  
});  

router.post('/login', async (req, res) => {  
    const { username, password } = req.body;  

    try {  
        const user = await User.findOne({ username });  
        if (!user) {  
            return res.status(400).json({ message: 'Invalid credentials' });  
        }  

        const isMatch = await bcrypt.compare(password, user.password);  
        if (!isMatch) {  
            return res.status(400).json({ message: 'Invalid credentials' });  
        }  

        res.json({ message: 'Logged in successfully', userId: user._id });  
    } catch (error) {  
        res.status(500).json({ error: error.message });  
    }  
});  

module.exports = router;