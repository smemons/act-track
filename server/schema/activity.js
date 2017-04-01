const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

const ActSchema = new Schema({
    actId: ObjectId,
    title: String,
    desc: String,
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: Date.now },
    opened: { type: Boolean, default: true },
    assignee: [String],
    category: String,
    createdAt: { type: Date, default: Date.now },
    createdBy: String

});
module.exports = mongoose.model('Acivity', ActSchema);