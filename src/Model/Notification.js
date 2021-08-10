const mongoose = require('mongoose');
const validator = require('validator')

const notificationModel = mongoose.Schema({
    member: {type: mongoose.Schema.Types.ObjectId, required: true},
    notification: { type: String, required: true },
    type: { type: String, required: true, default: 'NORMAL' },
    status: { type: String, required: true, default: 'UNREAD' },
}, { timestamps: true });

notificationModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});
module.exports = mongoose.model('Notification', notificationModel);