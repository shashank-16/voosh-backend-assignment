const express = require('express');
const router = express.Router();

const { getArtists, getArtist, addArtist, updateArtist, deleteArtist } = require('../../controller/artistController/artistService');
const { authToken, roleAuthToken, EditorAuthToken } = require('../../../middleware/authToken');

router.route('/').get(authToken, getArtists);
router.route('/:artist_id').get(authToken, getArtist);
router.route('/:artist_id').put(authToken, EditorAuthToken, updateArtist);
router.route('/:artist_id').delete(authToken, EditorAuthToken, deleteArtist);
router.route('/add-artist').post(authToken, EditorAuthToken, addArtist);

module.exports = router;