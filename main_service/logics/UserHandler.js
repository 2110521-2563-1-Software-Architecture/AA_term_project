var influx = require('../utils/influx');
const UrlModel = require('../model/Url');
const UserAccountModel = require('../model/UserAccount');
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));


module.exports = {
	home: async (user) => {
		return { status: 200, payload: { user: { "email": user.email, "name": user.name, "image": '/profile_picture/' + user._id.toString() + '.jpg' } } };
	},
	updateProfile: async (user, params) => {
		try {
			await UserAccountModel.updateOne({ _id: user._id }, { $set: params });
			user = await UserAccountModel.findOne({ _id: user._id });
			return { status: 200, payload: { user: { "email": user.email, "name": user.name } } };
		}
		catch (err) {
			return {
				status: 500, payload: { msg: "Something went wrong" }
			};
		}
	},
	deleteURL: async (user, hash) => {
		try {
			var url = await UrlModel.findOne({ hash });
			if (!url)
				return { status: 404, payload: { msg: "Not found" } };
			if (!url.creator)
				return { status: 404, payload: { msg: "Not found" } };
			if (!url.creator.equals(user._id))
				return { status: 404, payload: { msg: "Not found" } };
			await UrlModel.deleteOne({ _id: url._id });
			return { status: 204, payload: { msg: "Deleted" } };
		}
		catch (err) {
			return {
				status: 500, payload: { msg: "Something went wrong" }
			};
		}
	},
	getMyUrls: async (user) => {
		try {
			var urls = await UrlModel.find({ creator: user._id }, { name: 1, hash: 1, created: 1, target_url: 1, domain: 1, _id: 0 }).sort({ created: -1 });
			if (urls.length == 0)
				return { status: 200, payload: { urls: [] } };
			var hashes = urls.map((row) => `hash='${row.hash}'`);
			var mapper = {};
			rows = await influx.query(`
				SELECT COUNT(*) AS count FROM visits
				WHERE ${hashes.join(" or ")}
				GROUP BY hash
			`);
			rows.forEach(row => mapper[row.hash] = row.count_status);
			results = urls.map((url) => {
				var count = mapper[url.hash];
				if (!count)
					count = 0;
				return Object.assign({}, url._doc, { visit_count: count })
			});
			return { status: 200, payload: { urls: results } };
		}
		catch (err) {
			return {
				status: 500, payload: { msg: "Something went wrong" }
			};
		}
	},
	getURLInfo: async (user, hash) => {
		try {
			var url = await UrlModel.findOne({ hash, creator: user._id }, { name: 1, hash: 1, created: 1, target_url: 1, domain: 1, _id: 0 });
			if (!url)
				return { status: 404, payload: { msg: "Not found" } };
			var mapper = {};
			mapper[url.hash] = 0;
			rows = await influx.query(`
				SELECT COUNT(*) AS count FROM visits
				WHERE hash='${url.hash}'
				GROUP BY hash
			`);
			rows.forEach(row => mapper[row.hash] = row.count_status);
			return { status: 200, payload: Object.assign({}, url._doc, { visit_count: mapper[url.hash] }) };
		}
		catch (err) {
			return {
				status: 500, payload: { msg: "Something went wrong" }
			};
		}
	},
	getURLGraph: async (user, hash, lastX) => {
		try {
			var choices = {
				"30d": "12h",
				"15d": "6h",
				"7d": "3h",
				"3d": "1h",
				"1d": "30m",
				"12h": "10m",
				"6h": "5m",
				"3h": "3m",
				"1h": "1m",
			}
			if (!choices[lastX])
				return { status: 400, payload: { msg: `Bad lastX, choices are 30d, 15d, 7d, 3d, 1d, 12h, 6h, 3h, 1h` } };
			var interval = choices[lastX];
			console.log(lastX, interval)

			var url = await UrlModel.findOne({ hash, creator: user._id });
			if (!url)
				return { status: 404, payload: { msg: "Not found" } };
			rows = await influx.query(`
				SELECT COUNT(*) AS count FROM visits
				WHERE time > (now() - ${lastX}) and hash='${url.hash}'
				GROUP BY time(${interval})
			`);
			results = rows.map(row => {
				return {
					precision: interval,
					start_time: row.time.toNanoISOString(),
					visit_count: row.count_status
				}
			});
			return { status: 200, payload: results };
		}
		catch (err) {
			return {
				status: 500, payload: { msg: "Something went wrong" }
			};
		}
	}
}