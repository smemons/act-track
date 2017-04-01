const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: String,
    desc: String,
    createdBy: { type: String, required: true },
    activityId: String,
    createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Task', TaskSchema);