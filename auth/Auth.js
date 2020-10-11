const settings = require('../config/settings');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
const UserAccountModel = require('../model/UserAccount');
const jwt = require('jsonwebtoken');

passport.use('login', new localStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await UserAccountModel.findOne({ email });

    if (!user)
      return done(null, false, { status: 401, payload: { msg: "Email / Password combination is not correct" } });

    const validate = await user.isValidPassword(password);
    if (!validate)
      return done(null, false, { status: 401, payload: { msg: "Email / Password combination is not correct" } });

    const body = { email: user.email };
    const token = jwt.sign(body, settings.JWT_SECRET, { expiresIn: '30 days' });

    return done(null, {}, { status: 200, payload: { token } });
  } catch (error) {
    return done(error);
  }
}));

passport.use('register', new localStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await UserAccountModel.findOne({ email });

    if (user)
      return done(null, false, { status: 409, payload: { msg: "Your email is already used to register" } });

    var newUser = await UserAccountModel.create({
      email,
      password: await bcrypt.hash(password, 10)
    })

    const body = { email: newUser.email };
    const token = jwt.sign(body, settings.JWT_SECRET, { expiresIn: '30 days' });

    return done(null, {}, { status: 200, payload: { token } });
  } catch (error) {
    return done(error);
  }
}));

passport.use('jwt-user', new JWTstrategy({
  secretOrKey: settings.JWT_SECRET,
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT')//from user param
}, async (token, done) => {
  try {
    const user = await UserAccountModel.findOne({ email: token.email });
    if (!user)
      return done(null, false);
    return done(null, { user });
  } catch (error) {
    done(error);
  }
}));
