const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../model/model');

//From Gerardo
passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email });

        if (!user) {
          return done(null, false, { message: 'The email entered is not a user.' });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: 'The password entered is wrong.' });
        }

        /*If the user and password match, it returns a "Logged in Successfully" message, 
        and the user information is sent to the next middleware.*/
        return done(null, user, { message: user });
      } catch (error) {
        return done(error);
      }
    }
  )
);

//From Gerardo
//Verify the JWT
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
  new JWTStrategy(
    {
      secretOrKey: 'test',
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

//Helper functions that check if a user is authenticated and authorized
//https://stackoverflow.com/a/36340710/14447555
const authenticationCheck = passport.authenticate('jwt', { session: false })

function teacherAuthorizationCheck(req, res, next) {
    if (req.user.role !== 'teacher') {
        return res.status(403).json('The server understood the request, but is refusing to authorize it: only teachers can access this page.');
    } else {
        next();
    }
}

//Export the constant and fuction to use them in index.js
//https://stackoverflow.com/q/5797852/14447555
module.exports = {
  authenticationCheck,
  teacherAuthorizationCheck
};