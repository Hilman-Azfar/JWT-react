const bcrypt = require('bcryptjs');
const config = require('../config')

module.exports = {
  hashPassword,
  comparePassword
}

async function hashPassword(password) {
  try {
    const hashed = await bcrypt.hash(
      password, 
      parseInt(config.ROUNDS)
    )
    return hashed;
  } catch (err) {
    throw err
  }
}

async function comparePassword(password, storedPassword) {
  try {
    const valid = await bcrypt.compare(password, storedPassword);
    return valid;
  } catch (err) {
    throw err
  }
}