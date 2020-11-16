const fetch = require('node-fetch');
const randomString = require('random-base64-string');

const settings = require('../config/settings');
const UserAccountModel = require('../model/UserAccount');
const UrlModel = require('../model/Url');
var Util = require('../utils/util');

module.exports = {
    createURL: async (user, params) => {
        try {
            var domain = settings.SERVER_DOMAIN;
            if (params.domain) {
                try {
                    var res = await fetch('http://' + params.domain + '/api/public/domainconnect');
                    var text = await res.text();
                    if (res.status != 200 || text != "Connected to AA short")
                        return {
                            status: 400, payload: { msg: "The domain " + params.domain + " is not pointed to our server yet" }
                        };
                    domain = params.domain;
                }
                catch (err) {
                    return {
                        status: 400, payload: { msg: "The domain " + params.domain + " is not pointed to our server yet" }
                    };
                }
            }
            if (params.customHash) {
                var count = await UrlModel.countDocuments({ hash: params.customHash });
                if (count > 0)
                    return {
                        status: 400, payload: { msg: "The hash " + params.customHash + " is already taken :(" }
                    };
            }
            var user_id = null;
            if (user)
                user_id = user._id;
            var url = null;
            while (true) {
                var hash = randomString(8);
                if (params.customHash)
                    hash = params.customHash;
                var count = await UrlModel.countDocuments({ hash });
                if (count == 0) {
                    url = await UrlModel.create({
                        name: params.name,
                        creator: user_id,
                        target_url: params.target_url,
                        hash: hash,
                        domain: domain,
                    });
                    break;
                }
            }
            return {
                status: 201,
                payload: {
                    name: params.name,
                    target_url: params.target_url,
                    hash: hash,
                    domain: params.domain
                }
            }
        }
        catch (err) {
            return {
                status: 500, payload: { msg: "Something went wrong" }
            };
        }
    },
    getTargetUrl: async (hash) => {
        try {
            var url = await UrlModel.findOne({ hash });
            if (!url)
                return { status: 404, payload: { msg: "Not Found" } };
            return { status: 200, payload: { target_url: url.target_url } };
        }
        catch (err) {
            return {
                status: 500, payload: { msg: "Something went wrong" }
            };
        }
    },
    getAdsUrl: async () => {
        return { status: 200, payload: { images: ["/ads1.jpg", "/ads2.jpg"] } };
    },
};