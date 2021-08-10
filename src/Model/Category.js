const mongoose = require('mongoose');
const validator = require('validator')

const categoryModel = mongoose.Schema({
    name: { type: String, required: true },
}, { timestamps: true });

categoryModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});
module.exports = mongoose.model('CompanyCategory', categoryModel);