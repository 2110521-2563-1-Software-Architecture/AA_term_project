const express = require('express');
const passport = require('passport');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const PublicRoute = require('./Public');
const PrivateRoute = require('./Private');

//rate limiter
const PublicLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 1000000000
});
const PrivateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 1000000000
});
//end rate limiter

router.use('/public', PublicLimiter, PublicRoute);
router.use('/user', PrivateLimiter, passport.authenticate('jwt-user', { session: false }), PrivateRoute);

module.exports = router;
