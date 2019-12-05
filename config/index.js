const {
    PORT,
    DATABASE_HOST,
    DATABASE_NAME,
    JWT_SECRET_KEY
} = require('./environment'),
    db = require('./connection')

module.exports = {
    PORT: PORT,
    DATABASE_HOST: DATABASE_HOST,
    DATABASE_NAME: DATABASE_NAME,
    JWT_SECRET_KEY: JWT_SECRET_KEY,
    db: db
}