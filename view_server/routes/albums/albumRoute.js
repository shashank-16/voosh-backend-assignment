const express = require('express');

const router = express.Router();
const { getAlbums, getAlbum, addAlbum, updateAlbum, deleteAlbum } = require('../../controller/albumController/albumService');
const { authToken, roleAuthToken, EditorAuthToken } = require('../../../middleware/authToken');

router.route('/').get(authToken, getAlbums);
router.route('/:album_id').get(authToken, getAlbum);
router.route('/:album_id').put(authToken, EditorAuthToken, updateAlbum);
router.route('/:album_id').delete(authToken, EditorAuthToken, deleteAlbum);
router.route('/add-album').post(authToken, EditorAuthToken, addAlbum);

module.exports = router;