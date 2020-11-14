const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');
const chatController = require('../controllers/chat');

module.exports = router;

router.use(authController.authorize);

router.post('/contact', chatController.addContact);

router.get('/contact', chatController.getContacts);

router.post('/create', chatController.createRoom);

router.get('/rooms', chatController.getRooms);

router.post('/message', chatController.sendMessage);

router.get('/message/:roomid', chatController.getMessages);