const mongoose = require('mongoose');
const validator = require('validator')

const answerModel = mongoose.Schema({
    participant: {type: mongoose.Schema.Types.ObjectId, ref: 'Participant'},
    question: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Question' },
    answer: { type: String, required: true, }
}, { timestamps: true });

answerModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});
module.exports = mongoose.model('Answer', answerModel);