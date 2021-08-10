const mongoose = require('mongoose');
const validator = require('validator')

const sectionModel = mongoose.Schema({
    name: { type: String, required: true },
    parent: {type: mongoose.Schema.Types.ObjectId, ref: 'Section', default: null}
}, { timestamps: true });

sectionModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});
module.exports = mongoose.model('Section', sectionModel);