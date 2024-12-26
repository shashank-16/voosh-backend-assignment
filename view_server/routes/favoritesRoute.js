const express = require('express');
const router = express.Router();

const { getFavorites, addFavorite, deleteFavorite } = require('../controller/favoritesController/favoritesService');
const { authToken } = require('../../middleware/authToken');

router.route('/:category').get(authToken, getFavorites);
router.route('/add-favorite').post(authToken, addFavorite);
router.route('/remove-favorite/:favorite_id').delete(authToken, deleteFavorite);

module.exports = router;