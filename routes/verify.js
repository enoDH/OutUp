const express = require('express');
const passport = require('passport');
const router = express.Router();

const controller = require('../controllers/verify');

router.delete('/email/:code', passport.authenticate('jwt', { session: false }), controller.compare);
router.delete('/code/:code', controller.resetPassword);

module.exports = router;