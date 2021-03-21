const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

/*Schema with Moongoose, some of the fields are trimmed and turned to lowercase. All fields are required.*/
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
        enum: ['student', 'teacher'],
        default: 'student'
    },
    password: {
        type: String,
        required: true
    },
    place: {
        type: String,
        enum: ['on-campus', 'home-office'],
        default: 'on-campus',
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'busy'],
        default: 'available',
        required: true
    }
});

//Code by Gerardo
/*This pre-method runs right before a new user is saved. 
Its purpose is to hash a password. By hashing the password, 
it is never stored in plain text in the database.*/
UserSchema.pre('save',
    async function (next) {
        const hashedPassword = await bcrypt.hash(this.password, 10);

        this.password = hashedPassword;
        next();
    }
);

//Code by Gerardo
/*This method checks if the user-entered password is the same as the hased password
from the dataabse -> if so, return true*/
UserSchema.methods.isValidPassword = async function (password) {
    const compare = await bcrypt.compare(password, this.password);

    return compare; //TRUE / FALSE
}

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;