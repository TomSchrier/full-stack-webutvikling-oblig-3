const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../model/model');
const jwt = require ('jsonwebtoken');
const passport = require('passport')

const getPublicHomePage = async (req, res) => {
    res.status(200).json('Hello visitor. This is the home page.');
};

const createNewUser = async (req, res) => {
    const { name, surname, email, role, password, place, status } = req.body;

    let alreadyInDatabase = await UserModel.findOne({ email });

    if (alreadyInDatabase) {
        return res.status(400).json({ error: "The email is already in use." })
    }

    const newUser = new UserModel({
        name: name,
        surname: surname,
        email: email,
        role: role.toLowerCase(),
        password: password,
        place: place.toLowerCase(),
        status: status.toLowerCase()
    });

    await newUser
        .save()
        .then(() => res.status(200).json({ newUser }))
        .catch((error) => res.status(500).send("Something went wrong during sign up."))
};

const loginUser = async (req, res) => {
    res.status(200).json('Hello. This is the login page.');
 };

 const forgotPassword = async (req, res) => {
    res.status(200).json('Hello. This is the reset password page.');
 };

module.exports = {
    createNewUser,
    forgotPassword,
    getPublicHomePage,
    loginUser
};