const express = require('express');
const passport = require('passport');
const router = express.Router();

const controller = require('../controllers/auth');

router.post('/login', controller.login);
router.post('/register', controller.register);
router.get('/user', passport.authenticate('jwt', { session: false }), controller.getUser);
router.get('/confirm', passport.authenticate('jwt', { session: false }), controller.getConfirm);
router.get('/check/:data', controller.checkEmail);
router.patch('/reset/:id', controller.passwordReset);

module.exports = router;