require('dotenv').config()

module.exports = {
  development: {
    username: process.env.SEQUELIZE_USERNAME,
    password: process.env.SEQUELIZE_PASSWORD,
    database: process.env.ECOMMERCE_MYSQL_DATABASE,
    port: process.env.ECOMMERCE_MYSQL_PORT,
    dialect: process.env.SEQUELIZE_DIALECT,
    portApp: process.env.ECOMMERCE_APP_PORT
  },
  test: {
    username: process.env.SEQUELIZE_USERNAME,
    password: process.env.SEQUELIZE_PASSWORD,
    database: process.env.ECOMMERCE_MYSQL_DATABASE,
    port: process.env.ECOMMERCE_MYSQL_PORT,
    dialect: process.env.SEQUELIZE_DIALECT
  },
  production: {
    username: process.env.SEQUELIZE_USERNAME,
    password: process.env.SEQUELIZE_PASSWORD,
    database: process.env.ECOMMERCE_MYSQL_DATABASE,
    port: process.env.ECOMMERCE_MYSQL_PORT,
    dialect: process.env.SEQUELIZE_DIALECT
  },
  token: {
    secret: process.env.JWT_PASS,
    expiresIn: '1d'
  },
}