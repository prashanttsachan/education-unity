const mongoose = require('mongoose');
const validator = require('validator')

const participantModel = mongoose.Schema({
    test: {type: mongoose.Schema.Types.ObjectId, ref: 'Test'},
    company: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
    name: { type: String, required: true },
    email: {type: String, required: true,
        validate: (value) => {
            return validator.isEmail(value)
        }  
    },
    mobile: {type: String, required: true },
    gender: { type: String, required: true },
    ip: {type: String, default: 'NA'},
    dob: {type: String},
    status: {type: String, default: 'ACTIVE'},
    remarks: {type: String, default: 'Okay'},
    windowSwitch: { type: Number, default: 0, required: true},
    submissionType: {type:String, default: 'Normal', required: true},
    section: [{
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Section'},
        name: { type: String, ref: 'Question.name'},
        marks: { type: Number, required: true, default: 0},
        attempt: { type: Number, required: true, default: 0},
        total: { type: Number, required: true},
        question: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
    }]
}, { timestamps: true });

participantModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});
module.exports = mongoose.model('Participant', participantModel);