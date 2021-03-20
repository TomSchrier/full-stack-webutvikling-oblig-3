/* const passport = require('passport');
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

        
        If the user and password match, it returns a "Logged in Successfully" message, 
        and the user information is sent to the next middleware.
        
        return done(null, user, { message: user });
      } catch (error) {
        return done(error);
      }
    }
  )
);


//DENNE

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
); */

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../model/model');


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
                    return done(null, false, { message: 'User not found' });
                }

                const validate = await user.isValidPassword(password);
                if (!validate) {
                    return done(null, false, { message: 'Wrong password' });
                }

                return done(null, user, { message: 'Logged in successfully!' })
            } catch (error) {
                return done(error);
            }
        }
    )
)

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