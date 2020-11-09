const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = {
  checkToken,
  createToken
}

async function checkToken(token) {
  // check if valid
  // we can check roles and access here too
  // use jwt lib to decode
  try {
    return jwt.verify(token, config.SECRET);
  } catch (err) {
    throw new Error('Unable to verify token');
  }
}

async function createToken(id, username) {
  const payload = {
    _id: id,
    username,
  }

  const token = jwt.sign(
    payload,
    config.SECRET, {
      expiresIn: '1d'
    }
  )
  return token
}