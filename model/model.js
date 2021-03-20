const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
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

//Code by Gerardo
UserSchema.pre('save',
    async function (next) {
        const hashedPassword = await bcrypt.hash(this.password, 10);

        this.password = hashedPassword;
        next();
    }
);

//Code by Gerardo
UserSchema.methods.isValidPassword = async function (password) {
    const compare = await bcrypt.compare(password, this.password);

    return compare; //TRUE / FALSE
}

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;