const mongoose = require('mongoose');
const validator = require('validator')

const testModel = mongoose.Schema({
    name: { type: String, required: true },
    duration: { type: Number, required: true },
    sections: [
            {
                _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Section'}, 
                name: {type: String, ref: 'Section.name'},
                questions: {type: Number},
                marks: {type: Number}
            },
        ],
    price: {type: Number, required: true, default: 0},
    status: { type: Boolean, required: true, default: true}
}, { timestamps: true });

testModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});
module.exports = mongoose.model('Test', testModel);