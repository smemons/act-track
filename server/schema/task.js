const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: String,
    desc: String,
    activityId: String,
    percentage: Number,
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: Date.now },
    createdBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Task', TaskSchema);