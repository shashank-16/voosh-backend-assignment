const express = require('express');
const router = express.Router();

router.route('/').get();
router.route('/:id').get();
router.route('/:id').put();
router.route('/:id').delete();
router.route('/add-track').post();
