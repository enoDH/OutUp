const express = require('express');
const passport = require('passport');
const upload = require('../middleware/upload');
const router = express.Router();

const controller = require('../controllers/training');

router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.create);
router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll);
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getById);
router.patch('/', passport.authenticate('jwt', {session: false}), controller.update);
router.patch('/activation', passport.authenticate('jwt', {session: false}), controller.updateUsers);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.delete);

module.exports = router;