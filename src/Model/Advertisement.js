const mongoose = require('mongoose');

const adModel = mongoose.Schema({
    name: { type: String, required: true },
    about: { type: String, required: true },
    link: { type: String, required: true },
    image: { type: String },
    status: { type: String, default: 'ACTIVE' },
    expiry: { type: Date }
}, { timestamps: true });

adModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});
module.exports = mongoose.model('Advertisement', adModel);