const mongoose = require('mongoose');
const validator = require('validator')

const ticketModel = mongoose.Schema({
    subject: { type: String, required: true },
    member: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    message: {type: String, required: true},
    status: {type:String, default: 'SUBMITTED'},
    remarks: { type: String}
}, { timestamps: true });

ticketModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});
module.exports = mongoose.model('Ticket', ticketModel);