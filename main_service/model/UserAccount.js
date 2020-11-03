const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserAccountSchema = new Schema({
	email: {
		type: String,
		default: "",
		unique: true,
	},
	password: {
		type: String,
		default: "",
	},
	name: {
		type: String,
		default: "",
	},
	created: {
		type: Date,
		default: Date.now,
	},
});

UserAccountSchema.methods.isValidPassword = async function (password) {
	const user = this;
	const compare = await bcrypt.compare(password, user.password);
	return compare;
}

const UserAccountModel = mongoose.model('useraccount', UserAccountSchema);
module.exports = UserAccountModel;