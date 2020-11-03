const express = require('express');
const passport = require('passport');
var Util = require('../utils/util');
const router = express.Router();
var PublicHandler = require('../logics/PublicHandler');

router.post('/register', async (req, res, next) => {
	if (!Util.ensureKeys(req.body, ['email', 'password']))
		return res.status(400).json({ msg: 'Missing Params "email" and "password"' });
	passport.authenticate('register', { session: false }, async (err, user, info) => {
		if (err)
			return res.status(500).json({ msg: "Error" });

		return res.status(info.status).json(info.payload);
	})(req, res, next);
});

router.post('/login', async (req, res, next) => {
	if (!Util.ensureKeys(req.body, ['email', 'password']))
		return res.status(400).json({ msg: 'Missing Params "email" and "password"' });
	passport.authenticate('login', { session: false }, async (err, user, info) => {
		if (err)
			return res.status(500).json({ msg: "Error" });

		return res.status(info.status).json(info.payload);
	})(req, res, next);
});

router.post('/urls', async (req, res, next) => {
	if (!Util.ensureKeys(req.body, ['target_url']))
		return res.status(400).json({ msg: 'Missing Params "target_url"' });
	passport.authenticate('jwt-user', { session: false }, async (err, user) => {
		var result = await PublicHandler.createURL(user.user, Util.subsetUnchecked(req.body, ['name', 'target_url', 'domain']));
		return res.status(result.status).json(result.payload);
	})(req, res, next);
});

router.get('/domainconnect', async (req, res, next) => {
	return res.status(200).send("Connected to AA short");
});

router.get('/urls/:urlHash/redirect', async (req, res, next) => {
	var result = await PublicHandler.getTargetUrl(req.params.urlHash);
	return res.status(result.status).json(result.payload);
});

router.get('/ads', async (req, res, next) => {
	var result = await PublicHandler.getAdsUrl();
	return res.status(result.status).json(result.payload);
});

router.all('*', async (req, res, next) => {
	res.status(404).send('Not found');
});

module.exports = router;
