const express = require('express');
const router = express.Router();

const { getTracks, getTrack, addTrack, updateTrack, deleteTrack } = require('../../controller/trackController/trackService');
const { authToken, roleAuthToken, EditorAuthToken } = require('../../../middleware/authToken');

router.route('/').get(authToken, getTracks);
router.route('/:track_id').get(authToken, getTrack);
router.route('/:track_id').put(authToken, EditorAuthToken, updateTrack);
router.route('/:track_id').delete(authToken, EditorAuthToken, deleteTrack);
router.route('/add-track').post(authToken, EditorAuthToken, addTrack);

module.exports =
    router
