const mongoose = require('mongoose');
const validator = require('validator')

const companyModel = mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    category: [
        {_id: {type: mongoose.Schema.Types.ObjectId, ref: 'CompanyCategory'}},
    ],
    member: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    balance: {type: Number, required: true, default: 0},
    gstIn: {type: String},
    panNumber: {type: String},
    contactPersonName: { type: String },
    contactPersonEmail: { type: String },
    contactPersonMobile: { type: String },
    accountType: {type:String, default: 'DEMO'},
    validUpto: { type: String, default: Date}
}, { timestamps: true });

companyModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});
module.exports = mongoose.model('Company', companyModel);