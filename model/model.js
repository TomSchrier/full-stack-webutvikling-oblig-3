const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    role: {
        type: String,
        required: true,
        enum: ['student','teacher'],
        default: 'student'
    },
    password: {
        type: String,
        required: true
    },
    place: {
        type: String,
        enum: ['on-campus','home-office'],
        default: 'on-campus',
        required: true
    },
    status: {
        type: String,
        enum: ['available','busy'],
        default: 'available',
        required: true
    }
});

const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;