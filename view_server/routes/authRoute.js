const express = require('express');
const router = express.Router();

const login = require("../controller/authController/login");

router.route('/Logout').get();
router.route('/signup').post();
router.route('/login').post(login);

module.exports = router;