const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    companyAddress: {
        type: String,
        required: true
    },
    telephone: {
        type: Number,
        required: true
    },
    userRole: [{
        type: String,
        enum: ['user', 'juror', 'admin'],
        default: 'user',
        required: true
    }],
    refreshTokenForPassword: {
        type: String,
        required: false
    }
},
    { versionKey: false, timestamps: true }
)

module.exports = mongoose.model('User', userSchema)