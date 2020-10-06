/**
 * is-logged-in
 *
 * A simple policy that allows any request from an authenticated user.
 *
 * For more about how to use policies, see:
 *   https://sailsjs.com/config/policies
 *   https://sailsjs.com/docs/concepts/policies
 *   https://sailsjs.com/docs/concepts/policies/access-control-and-permissions
 */
module.exports = function (req, res, next) {

  // get token from header an validate it
  var token = req.headers["x-token"];

  function send401() {
    res.send(401, { err: 'E_LOGIN_REQUIRED', message: 'Login required' });
  }

  // validate we have all params
  if (!token) return send401();

  // validate token and set req.User if we have a valid token
  sails.services.tokenauth.verifyToken(token, function (err, data) {
    if (err) return send401();

    User.findOne({ id: data.userId }, function (err, User) {
      if (err) send401();
      req.User = User;
      next();
    });
  });
};
