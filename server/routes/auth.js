const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');

const authController = require('../controllers/AuthController');

router.get('/', verifyToken, authController.isLoggedIn);
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
