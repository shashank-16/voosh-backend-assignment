const express = require('express');
const router = express.Router();

const login = require("../controller/authController/login");
const { userSignUp, logout } = require('../controller/authController/authSerivce');

const { authToken } = require('../../middleware/authToken');

router.route('/Logout').get(authToken, logout); // to do
router.route('/signup').post(userSignUp);
router.route('/login').post(login);

module.exports = router;