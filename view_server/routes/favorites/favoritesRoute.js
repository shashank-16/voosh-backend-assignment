const express = require('express');
const router = express.Router();

const { getFavorites, getByArtist, addFavorite, updateFavorite, deleteFavorite } = require('../../controller/favoritesController/favoritesService');

router.route('/:category').get(getFavorites);
router.route('/artist').get(getByArtist);
router.route('/remove-favorite/:favorite_id').delete(deleteFavorite);
router.route('/add-favorite').post(addFavorite);

module.exports =
    router
