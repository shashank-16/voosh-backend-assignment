const { userSignUp, getUser } = require('../../controller/authController/authSerivce');

const { authToken } = require('../../../middleware/authToken');
const express = require('express');
const router = express.Router();

router.route('/').get(authToken, getUser);
router.route('/add-user').post(userSignUp);
router.route('/:id').delete();
router.route('/update-password').put();

module.exports = router; 