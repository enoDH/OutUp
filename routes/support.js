const express = require('express');
const passport = require('passport');
const router = express.Router();

const controller = require('../controllers/support');

router.post('/', passport.authenticate('jwt', { session: false }), controller.createSupportRequest);
router.get('/', passport.authenticate('jwt', { session: false }), controller.getAllSupportRequest);
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getSupportRequest);
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.deleteSupportRequest);

module.exports = router;