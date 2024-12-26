const express = require('express');
const router = express.Router();

const { getFavorite, addFavorite, deleteFavorite } = require('../../controller/favoritesController/favoritesService');
const { authToken } = require('../../../middleware/authToken')
router.route('/:category').get(authToken, getFavorite);
router.route('/remove-favorite/:favorite_id').delete(authToken, deleteFavorite);
router.route('/add-favorite').post(authToken, addFavorite);

module.exports =
    router
