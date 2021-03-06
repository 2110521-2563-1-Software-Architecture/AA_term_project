const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
const dns = require('dns');

module.exports = {
	ensureKeys: (obj, keys) => {
		for (var i = 0; i < keys.length; i++)
			if (!obj.hasOwnProperty(keys[i]))
				return false;
		return true;
	},
	subsetUnchecked: (obj, keys) => {
		var out = {};
		for (var i = 0; i < keys.length; i++)
			out[keys[i]] = obj[keys[i]];
		return out;
	},
	subsetArrayUnchecked: (obj, keys) => {
		for (var i = 0; i < obj.length; i++)
			obj[i] = module.exports.subsetUnchecked(obj[i], keys);
		return obj;
	},
	subsetArrayUnchecked: (obj, keys) => {
		for (var i = 0; i < obj.length; i++)
			obj[i] = module.exports.subsetUnchecked(obj[i], keys);
		return obj;
	},
	dnslookup: (domain) => {
		return new Promise((resolve, reject) => {
			dns.lookup(domain, (err, address, family) => {
				if (err) reject(err);
				resolve(address);
			});
		})
	}
};