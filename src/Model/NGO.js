const mongoose = require('mongoose');

const ngoModel = mongoose.Schema({
    member: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    image: { type: String },
    name: { type: String, required: true },
    status: { type: String, default: 'ACTIVE' },
}, { timestamps: true });

ngoModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});
module.exports = mongoose.model('NGO', ngoModel);