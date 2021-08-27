const mongoose = require('mongoose');

const quizModel = mongoose.Schema({
    member: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    description: { type: String, required: true },
    from: { type: Date, required: true },
    upto: { type: Date, required: true },
    status: { type: String, default: 'ACTIVE' },
}, { timestamps: true });

quizModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});
module.exports = mongoose.model('Quiz', quizModel);