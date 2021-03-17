const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

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

UserSchema.pre('save',
    async function (next) {
        const hashedPassword = await bcrypt.hash(this.password, 10);

        this.password = hashedPassword;
        next();
    }
);

/*
UserSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
}*/

const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;