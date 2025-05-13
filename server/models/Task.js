const mongoose = require('mongoose');  

const TaskSchema = new mongoose.Schema({  
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  
    text: { type: String, required: true },  
    dueDate: { type: Date, required: true },  
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },  
    completed: { type: Boolean, default: false }  
});  

module.exports = mongoose.model('Task', TaskSchema);