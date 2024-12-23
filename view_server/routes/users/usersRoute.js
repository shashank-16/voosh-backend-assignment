const express = require('express');
const router = express.Router();

router.route('/').get((req, res) => {
    res.send("user");
});
router.route('/add-user').post();
router.route('/:id').delete();
router.route('/update-password').put();

module.exports = router;