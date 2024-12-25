const { userSignUp, getUser, deleteUser, updatePassword } = require('../../controller/authController/authSerivce');

const { authToken, roleAuthToken } = require('../../../middleware/authToken');
const express = require('express');
const router = express.Router();

router.route('/').get(authToken, roleAuthToken, getUser);
router.route('/add-user').post(authToken, roleAuthToken, userSignUp);
router.route('/:user_id').delete(authToken, roleAuthToken, deleteUser);
router.route('/update-password').put(authToken, updatePassword);

module.exports = router; 