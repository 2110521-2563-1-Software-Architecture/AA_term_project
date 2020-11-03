const settings = require('../config/settings')
const Influx = require('influx');

const influx = new Influx.InfluxDB({
    host: settings.INFLUX_HOST,
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

module.exports = influx;