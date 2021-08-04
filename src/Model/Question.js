const mongoose = require('mongoose');

const quesModel = mongoose.Schema({
    question: { type: String, required: true },
    member: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    answer: [
        { answer: { type: String, required: true } }
    ],
    correctAnswer: { type: mongoose.Schema.Types.ObjectId, ref: 'Question.answer', default: null },
    status: { type: String, default: 'ACTIVE' },
}, { timestamps: true });

quesModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});
module.exports = mongoose.model('Question', quesModel);