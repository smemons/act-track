const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ActSchema = new Schema({

    parentId: String,
    title: String,
    desc: String,
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: Date.now },

    sponsor: [String],
    assignee: [String],
    percentage: Number, // percentage of completion
    catId: String, //category Id
    deptId: [String], //dept Id
    focusId: String, //focus Id
    phaseId: String, //phase Id
    visId: [String], //Visisblity ID
    statusId: String, //statusID
    createdAt: { type: Date, default: Date.now },
    createdBy: String,
    updatedAt: { type: Date, default: Date.now },
    updatedBy: String

});
module.exports = mongoose.model('Acivity', ActSchema);
