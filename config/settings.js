require('dotenv').config()

module.exports = {
    PORT: process.env.SERVER_PORT,
    DATABASE_URL: process.env.MONGO_CONNECTION,
    JWT_SECRET: process.env.JWT_SECRET
}
