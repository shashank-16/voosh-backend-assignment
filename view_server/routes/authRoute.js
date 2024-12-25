const express = require('express');
const router = express.Router();

const login = require("../controller/authController/login");
const { userSignUp } = require('../controller/authController/authSerivce');

router.route('/Logout').get(); // to do
router.route('/signup').post(userSignUp);
router.route('/login').post(login);

module.exports = router;