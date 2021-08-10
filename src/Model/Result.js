const mongoose = require('mongoose');

const resModel = mongoose.Schema({
    member: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
    marks: { type: String },
    status: { type: String, default: 'ACTIVE' },
}, { timestamps: true });

resModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});
module.exports = mongoose.model('Result', resModel);