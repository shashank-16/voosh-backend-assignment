const express = require('express');

const router = express.Router();
const { getAlbums, getAlbum, addAlbum, updateAlbum, deleteAlbum } = require('../../controller/albumController/albumService');
const { authToken } = require('../../../middleware/authToken');

router.route('/').get(authToken, getAlbums);
router.route('/:album_id').get(authToken, getAlbum);
router.route('/:album_id').put(authToken, updateAlbum);
router.route('/:album_id').delete(authToken, deleteAlbum);
router.route('/add-album').post(authToken, addAlbum);

module.exports = router;