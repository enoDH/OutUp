const express = require('express');
const passport = require('passport');
const upload = require('../middleware/upload');
const router = express.Router();


const controller = require('../controllers/base');

router.post('/', passport.authenticate('jwt', {session: false}), upload.single('video'), controller.createExercise);
router.get('/', passport.authenticate('jwt', {session: false}), controller.getAllExercises);
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getExercise);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.deleteExercise);

module.exports = router;