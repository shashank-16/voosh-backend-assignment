const express = require('express');
const router = express.Router();

const { getArtists, getArtist, addArtist, updateArtist, deleteArtist } = require('../../controller/artistController/artistService');
const { authToken } = require('../../../middleware/authToken');

router.route('/').get(authToken, getArtists);
router.route('/:artist_id').get(authToken, getArtist);
router.route('/:artist_id').put(authToken, updateArtist);
router.route('/:artist_id').delete(authToken, deleteArtist);
router.route('/add-artist').post(authToken, addArtist);

module.exports = router;