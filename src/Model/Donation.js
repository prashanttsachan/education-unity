const mongoose = require('mongoose');

const donationModel = mongoose.Schema({
    member: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    image: { type: String },
    location: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: 'ACTIVE' },
}, { timestamps: true });

donationModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});
module.exports = mongoose.model('Donation', donationModel);