const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const controller = require('../controller/controller');

//Public routes
router.get('/', controller.getPublicHomePage);

router.post('/signup', controller.createNewUser);

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
                            const body = { _id: user._id, email: user.email, role: user.role };
                            const token = jwt.sign({ user: body }, 'test');
                            return res.json(token);
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