const jwt = require('jsonwebtoken');  
const User = require('../models/User');  

module.exports = async (req, res, next) => {  
    const token = req.headers['authorization'];  
    
    if (!token) return res.status(401).send('Access denied.');  

    try {  
        const verified = jwt.verify(token, 'YOUR_SECRET_KEY'); // replace with secret key
        req.user = await User.findById(verified.id);  
        next();  
    } catch (error) {  
        res.status(400).send('Invalid token.');  
    }  
};