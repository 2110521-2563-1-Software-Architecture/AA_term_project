const UserAccountModel = require('../model/UserAccount');
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));


module.exports = {
	home: async (user) => {
		return { user: { "email": user.email, "name": user.name } };
	},
};