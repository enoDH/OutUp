const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async function (req, res) {
  const candidate = await User.findOne({ login: req.body.login });

  if (candidate) {
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);

    if (passwordResult) {
      const token = jwt.sign(
        {
          name: candidate.name,
          login: candidate.login,
          userId: candidate._id
        },
        config.secret_key,
        { expiresIn: '1h' });

      res.status(200).json({ token: `Bearer ${token}` });
    } else {
      res.status(401).json({ message: 'Invalid password!' });
    }
  } else {
    res.status(404).json({ message: 'No user with this nickname was found!' });
  }
}


module.exports.register = async function (req, res) {
  const candidate = await User.findOne({ login: req.body.login });

  if (candidate) {
    res.status(409).json({ message: 'This nickname is already taken!' });
  }
  else if ((req.body.password).length < 8) {
    res.status(412).json({ message: 'The password field must be filled in correctly!' });
  }
  else {


    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;

    const user = new User({
      name: req.body.name,
      login: req.body.login,
      password: bcrypt.hashSync(password, salt)
    });

    try {
      await user.save();
      res.status(201).json({ message: 'User registered!' });
    } catch (e) {
      errorHandler(res, e);
    }
  }
}