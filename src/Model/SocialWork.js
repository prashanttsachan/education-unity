const mongoose = require('mongoose');

const socialModel = mongoose.Schema({
    address: { type: String, required: true },
    message: { type: String, required: true },
    member: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    image: { type: String },
    status: { type: String, default: 'ACTIVE' },
}, { timestamps: true });

socialModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});
module.exports = mongoose.model('SocialWork', socialModel);