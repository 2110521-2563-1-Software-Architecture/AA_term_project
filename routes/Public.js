const express = require('express');
const passport = require('passport');
var Util = require('../utils/util');
const router = express.Router();

router.post('/register', async (req, res, next) => {
	if (!Util.ensureKeys(req.body, ['email', 'password']))
		return res.status(400).json({ msg: 'Missing Params "email" and "password"' });
	passport.authenticate('register', { session: false }, async (err, user, info) => {
		if (err)
			return res.status(500).json({ msg: "Error" });

		res.status(info.status).json(info.payload);
	})(req, res, next);
});

router.post('/login', async (req, res, next) => {
	if (!Util.ensureKeys(req.body, ['email', 'password']))
		return res.status(400).json({ msg: 'Missing Params "email" and "password"' });
	passport.authenticate('login', { session: false }, async (err, user, info) => {
		if (err)
			return res.status(500).json({ msg: "Error" });

		res.status(info.status).json(info.payload);
	})(req, res, next);
});

router.all('*', async (req, res, next) => {
	res.status(404).send('Not found');
});

module.exports = router;
