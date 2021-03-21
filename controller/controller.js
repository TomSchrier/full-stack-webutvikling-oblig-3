const UserModel = require('../model/model');
const jwt = require('jsonwebtoken');
const passport = require('passport');

/*Returns a message letting the user know they are on the front page of the application.*/
const getPublicHomePage = async (req, res) => {
    res.status(200).json('Hello visitor. This is the home page.');
};

/*When creating a new user, we check if the provided email already exists in the database, 
in that case, a new user cannot be created, otherwise, use mongoose to save a new user to the database*/
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

/*The user must provide an email and password combination that is stored in the database. 
When the user tries to log in, the entered password is compared to the hashed one. 
If the user successfully logs in, they get a JWT token that gives access to other routes. 
Their role is encoded in their token */
const loginUser = async (req, res, next) => {
    passport.authenticate(
        'login',
        async (err, user, info) => {
            try {
                if (err || !user) {
                    const error = new Error('An error occurred while logging in');
                    return next(info);
                }
                req.login(user, { session: false },
                    async (error) => {
                        if (error) return next(error);
                        const payload = { email: user.email, role: user.role };
                        const token = jwt.sign({ user: payload }, 'test', { expiresIn: '3h' });
                        return res.json({ "status": "Logged in successfully", "JWT": token });
                    })
            } catch (error) {
                return next(error);
            }
        }
    )(req, res, next);
};

/*The forgot password endpoint is quite plain. The user-provides an email they 
want to reset the password to, if it isn't in the database, then return an 
error, otherwise, let the user know that an email has been sent with instructions 
to reset the email.*/
const forgotPassword = async (req, res) => {
    let alreadyInDatabase = await UserModel.findOne({ email: req.body.email })

    if (!alreadyInDatabase) {
        return res.status(400).json({ error: "This email is unused, it is therefore not possible to reset its password" })
    }

    await alreadyInDatabase
        .then(() => res.status(200).json(`Instructions to reset the password have been sent to ${req.body.email}.`))
        .catch((error) => res.status(500).json(error))
};

module.exports = {
    createNewUser,
    forgotPassword,
    getPublicHomePage,
    loginUser
};