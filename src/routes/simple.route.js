// Contoh Routing
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home.controller');

// Home
router.get('/', homeController.index);

// Chat
router.get('/chat', homeController.chat);

module.exports = router;