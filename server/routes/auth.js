const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');

module.exports = router;

router.post('/login', authController.login);

router.post('/register', authController.register);

router.get('/verify', authController.verify);

router.get('/logout', authController.logout);