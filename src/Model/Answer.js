const mongoose = require('mongoose');

const ansModel = mongoose.Schema({
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    member: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    answer: { type: mongoose.Schema.Types.ObjectId, ref: 'Question.answer' },
    correct: { type: Boolean },
}, { timestamps: true });

ansModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});
module.exports = mongoose.model('Answer', ansModel);