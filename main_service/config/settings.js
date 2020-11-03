module.exports = {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.MONGO_CONNECTION,
    JWT_SECRET: process.env.JWT_SECRET,
    SERVER_DOMAIN: process.env.SERVER_DOMAIN,
    INFLUX_HOST: process.env.INFLUX_HOST,
}
