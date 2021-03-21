const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const controller = require('../controller/controller');

//Public routes - home page
router.get('/', controller.getPublicHomePage);

//Create new user
router.post('/signup', controller.createNewUser);

//Log in with an existing email and combination - if the login is successful, give the user a JWT token
router.post(
    '/login',
    async (req, res, next) => {
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
    }
);

router.post('/forgotpassword', controller.forgotPassword);

module.exports = router;