const chatterboxDB = require('../server');
const { hashPassword, comparePassword } = require('../utility/bcrypt');

module.exports = {
  register,
  login
}

async function register (username, password) {
  try {
    // find user
    const user = await chatterboxDB.collection('users').findOne({username: username});
    if (user) {
      // has user
      // throw error
      throw new Error('username taken');
    } else {
      // no user
      // insert
      const hashedPassword = await hashPassword(password);
      await chatterboxDB.collection('users').insertOne({username: username, password: hashedPassword});
    }
  } catch (err) {
    throw err;
  }
}

async function login (username, password) {
  try {
    // find user
    const user = await chatterboxDB.collection('users').findOne({username: username});
    if (user) {
      // has user
      // compare
      const valid = await comparePassword(password, user.password);
      if (!valid) {
        throw new Error('Check username/password');
      } 
      return {
        id: user._id,
        username: username
      }
    } else {
      // no user
      // throw error
      throw new Error('Check username/password');
    }
  } catch (err) {
    throw err;
  }
}