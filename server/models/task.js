const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    name: String,
    description: String,
    status: Boolean,
    dueDate: Date,
})

const Task = mongoose.model('Task', taskSchema);
module.exports = Task