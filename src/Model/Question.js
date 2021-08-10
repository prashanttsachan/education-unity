const mongoose = require('mongoose');
const validator = require('validator')

const questionModel = mongoose.Schema({
    section: { type: mongoose.Schema.Types.ObjectId, ref: 'Section'},
    question: { type: String, required: true },
    marks: { type: Number, required: true, default: 1 },
    questionImage: { type: String},
    questionType: { type: String, required: true },
    answers: [{answer: { type: String, required: true }}],
    correctAnswer: { type: Number }
}, { timestamps: true });

questionModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});
module.exports = mongoose.model('Question', questionModel);