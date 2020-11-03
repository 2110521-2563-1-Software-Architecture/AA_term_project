const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UrlSchema = new Schema({
    name: {
        type: String,
        default: "",
    },
    creator: {
        type: Schema.Types.ObjectId, ref: 'useraccount',
        default: null,
    },
    target_url: {
        type: String,
        default: "",
    },
    hash: {
        type: String,
        default: "",
        unique: true,
    },
    domain: {
        type: String,
        default: null,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

const UrlModel = mongoose.model('url', UrlSchema);
module.exports = UrlModel;