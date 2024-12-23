const express = require('express');
const router = express.Router();

// const { authLogin } = require("../controller/authController");

router.route('/Logout').get();
router.route('/signup').post();
router.route('/login').post();

module.exports = router;