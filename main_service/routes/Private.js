require('dotenv').config();
const express = require('express');
const router = express.Router();
var Util = require('../utils/util');
var UserHandler = require('../logics/UserHandler');

router.get('/whoami', async (req, res, next) => {
	var result = await UserHandler.home(req.user.user);
	return res.status(result.status).json(result.payload);
});

router.patch('/profile', async (req, res, next) => {
	if (!Util.ensureKeys(req.body, ['name']))
		return res.status(400).json({ msg: 'Missing Params "name"' });
	var result = await UserHandler.updateProfile(req.user.user, Util.subsetUnchecked(req.body, ['name']));
	return res.status(result.status).json(result.payload);
});

router.delete('/urls/:urlHash', async (req, res, next) => {
	var result = await UserHandler.deleteURL(req.user.user, req.params.urlHash);
	return res.status(result.status).json(result.payload);
});

router.get('/urls', async (req, res, next) => {
	var result = await UserHandler.getMyUrls(req.user.user);
	return res.status(result.status).json(result.payload);
});

router.get('/urls/:urlHash', async (req, res, next) => {
	var result = await UserHandler.getURLInfo(req.user.user, req.params.urlHash);
	return res.status(result.status).json(result.payload);
});

router.get('/urls/:urlHash/graph/:lastX', async (req, res, next) => {
	var result = await UserHandler.getURLGraph(req.user.user, req.params.urlHash, req.params.lastX, req.params.interval);
	return res.status(result.status).json(result.payload);
});

router.all('*', async (req, res, next) => {
	res.status(404).send('Not found');
});

module.exports = router;
