const express = require('express');
const router = express.Router();

const { getTracks, getTrack, addTrack, updateTrack, deleteTrack } = require('../../controller/trackController/trackService');

router.route('/').get();
router.route('/:track_id').get(getTrack);
router.route('/:track_id').put();
router.route('/:track_id').delete();
router.route('/add-track').post(addTrack);

module.exports =
    router
