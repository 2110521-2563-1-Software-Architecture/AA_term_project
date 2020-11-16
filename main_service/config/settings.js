module.exports = {
    PORT: process.env.PORT || 5000,
    DATABASE_URL: process.env.MONGO_CONNECTION || 'mongodb://localhost:27017/softarchdb',
    JWT_SECRET: process.env.JWT_SECRET || 'devsecret',
    SERVER_DOMAIN: process.env.SERVER_DOMAIN || 'localhost:5000',
    INFLUX_HOST: process.env.INFLUX_HOST || 'localhost',
}
