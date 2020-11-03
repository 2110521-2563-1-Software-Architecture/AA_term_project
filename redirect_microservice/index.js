const express = require('express');
const Influx = require('influx');
const app = express();
const fetch = require('node-fetch');
const port = process.env.PORT;

const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);

const mainservice = process.env.MAIN_SERVICE;
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

const influx = new Influx.InfluxDB({
    host: process.env.INFLUX_HOST,
    database: 'visitor_db',
    schema: [
        {
            measurement: 'visits',
            fields: {
                status: Influx.FieldType.INTEGER
            },
            tags: [
                'hash'
            ]
        }
    ]
});

const writePoint = async (hash, response_code) => {
    return await influx.writePoints([
        {
            measurement: 'visits',
            tags: { hash },
            fields: { status: response_code },
        }
    ])
}

const redisSet = (key, value) => {
    return new Promise((resolve, reject) => {
        client.set(key, value, (err, reply) => {
            if (err) reject(err);
            resolve(reply);
        });
    })
}

const redisGet = (key) => {
    return new Promise((resolve, reject) => {
        client.get(key, (err, reply) => {
            if (err) reject(err);
            resolve(reply);
        });
    })
}

const redisClearAds = () => {
    return new Promise((resolve, reject) => {
        client.del("ads", (err, reply) => {
            if (err) reject(err);
            resolve(reply);
        });
    })
}

const redisaddAds = (url) => {
    return new Promise((resolve, reject) => {
        client.sadd("ads", url, (err, reply) => {
            if (err) reject(err);
            resolve(reply);
        });
    })
}

const redisRandomAd = () => {
    return new Promise((resolve, reject) => {
        client.srandmember("ads", (err, reply) => {
            if (err) reject(err);
            resolve(reply);
        });
    })
}

const populateAds = async (req, res) => {
    try {
        var ress = await fetch(mainservice + `/api/public/ads`);
        if (ress.status == 200) {
            await redisClearAds();
            response = await ress.json();
            for (var i = 0; i < response.images.length; i++)
                await redisaddAds(response.images[i]);
        }
    }
    catch (err) {

    }
}

app.get('/:urlHash', async (req, res) => {
    var hash = req.params.urlHash;
    try {
        var target = await redisGet(hash);

        var ads = await redisRandomAd();
        if (!ads) {
            await writePoint(hash, 429);
            return res.status(429).json({ msg: "Too many request for ads" });
        }

        if (!target) {
            var ress = await fetch(mainservice + `/api/public/urls/${hash}/redirect`);
            var result = await ress.json();
            if (ress.status == 200) {
                await writePoint(hash, 200);
                redisSet(hash, result.target_url);
                return res.status(200).json({ target_url: result.target_url, ad: ads });
            }
            else {
                await writePoint(hash, ress.status);
                return res.status(ress.status).json(result);
            }
        }
        else {
            await writePoint(hash, 200);
            return res.status(200).json({ target_url: target, ad: ads });
        }
    }
    catch (err) {
        await writePoint(hash, 500);
        return res.status(500).json({ msg: "Something went wrong" });
    }
})

populateAds();
setInterval(populateAds, 10000);

const influxnstart = async () => {
    while (true) {
        try {
            var names = await influx.getDatabaseNames()
            if (!names.includes('visitor_db')) {
                influx.createDatabase('visitor_db');
            }
            break;
        }
        catch (err) {
            await sleep(1000);
        }
    }
    app.listen(port, () => console.log(`App on ${port}`));
}

influxnstart();