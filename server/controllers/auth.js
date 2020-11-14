const authModels = require('../models/auth');
const { createToken, checkToken } = require('../utility/jwt');

module.exports = {
  login,
  register,
  verify,
  logout,
  authorize
}

async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await authModels.login(username, password);
    const token = await createToken(user.id, user.username);
    
    const split = token.split('.');
    const payload = split[0] + '.' + split[1];
    const signature = split[2];
    res.cookie('jwt-payload', payload, {sameSite: true});
    res.cookie('jwt-signature', signature, {httpOnly: true, sameSite: true});
    await res.json({
      message: `logging ${username} in!`
    })
  } catch (err) {
    err.name = 'LoginError';
    err.status = 401;
    next(err)
  }
}

async function register(req, res, next) {
  try {
    const { username, password } = req.body;
    await authModels.register(username, password)
    res.json({
      message: `registered ${username}`
    })
  } catch (err) {
    err.name = 'RegistrationError';
    err.status = 400;
    next(err)
  }
}

async function verify(req, res, next) {
  try {
    const token = req.cookies['jwt-payload'] + '.' + req.cookies['jwt-signature'];
    const valid = await checkToken(token);
    if (valid) {
      res.json({
        message: 'valid'
      })
    } else {
      throw new Error('Access denied!');
    }

  } catch (err) {
    err.name = 'VerificationError';
    err.status = 403;
    next(err)
  }
}

async function authorize(req, res, next) {
  try {
    const token = req.cookies['jwt-payload'] + '.' + req.cookies['jwt-signature'];
    const valid = await checkToken(token);
    if (valid) {
      req.username = valid.username;
      next();
    }
  } catch (err) {
    err.name = 'VerificationError';
    err.status = 403;
    next(err)
  }
}

async function logout(req, res, next) {
  try {
    res.clearCookie('jwt-payload', {sameSite: true});
    res.clearCookie('jwt-signature', {httpOnly: true, sameSite: true});
    res.json({
      message: 'logged out'
    })
  } catch (err) {
    err.name = 'LogoutError';
    err.status = 400;
    next(err)
  }
}