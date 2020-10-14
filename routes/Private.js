require('dotenv').config();
const express = require('express');
const router = express.Router();
var Util = require('../utils/util');
var UserHandler = require('../logics/UserHandler');

router.get('/home', async (req, res, next) => {
	var result = await UserHandler.home(req.user.user);
	return res.json(result);
});

router.all('*', async (req, res, next) => {
	res.status(404).send('Not found');
});

module.exports = router;
