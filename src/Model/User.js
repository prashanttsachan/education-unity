const mongoose = require('mongoose');
const validator = require('validator')

const userModel = mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: {type: String, required: true, unique: true,
        validate: (value) => {
            return validator.isEmail(value)
        }  
    },
    mobile: {type: Number, required: true, unique: true},
    password: { type: String, required: true },
    type: {type: String, default: 'NA'},
    status: {type: String, default: 'ACTIVE'},
    remarks: {type: String, default: 'Okay'},
}, { timestamps: true });

userModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});
module.exports = mongoose.model('User', userModel);