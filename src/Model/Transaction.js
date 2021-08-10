const mongoose = require('mongoose');
const validator = require('validator')

const transactionModel = mongoose.Schema({
    amount: { type: Number, required: true },
    prev: { type: Number, required: true },
    current: { type: Number, required: true },
    company: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
    type: {type: String, required: true},
    remarks: { type: String, required: true}
}, { timestamps: true });

transactionModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});
module.exports = mongoose.model('Transaction', transactionModel);