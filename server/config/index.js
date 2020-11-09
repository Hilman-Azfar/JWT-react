require('dotenv').config()

module.exports = {
  PORT: process.env.PORT,
  URI: process.env.URI,
  SALT: process.env.SALT,
  ROUNDS: process.env.ROUNDS,
  SECRET: process.env.SECRET
}