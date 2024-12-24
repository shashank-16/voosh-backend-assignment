const express = require('express');
const router = express.Router();

router.route('/:category').get();
router.route('/abb-favorite').post();
router.route('/remove-favorite/:id').delete();

