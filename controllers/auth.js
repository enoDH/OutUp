const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Verify = require('../models/Verify');
const config = require('../config/config');
const errorHandler = require('../utils/errorHandler');
const mailer = require('../utils/nodemailer');
const email = require('../utils/emailTamplate');
const generator = require('../utils/generator');

module.exports.login = async function (req, res) {
  const candidate = await User.findOne({ login: req.body.login });

  if (candidate) {
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);

    if (passwordResult) {
      const token = jwt.sign(
        {
          name: candidate.name,
          login: candidate.login,
          userId: candidate._id,
          email: candidate.email
        },
        config.secret_key,
        { expiresIn: '1h' });

      res.status(200).json({ token: `Bearer ${token}` });
    }
    else {
      res.status(401).json({ message: 'Invalid password!' });
    }
  }
  else {
    res.status(404).json({ message: 'No user with this nickname was found!' });
  }
};

module.exports.register = async function (req, res) {
  try {
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

      const user = await new User({
        name: req.body.name,
        login: req.body.login,
        email: req.body.email,
        password: bcrypt.hashSync(password, salt)
      }).save();

      const secret_code = generator(12);

      let data = {
        outupEmail: config.outupEmail,
        email: req.body.email,
        subject: 'Confirmation of registration',
        html: email.verification('This email was sent because you registered with the OutUp service!', secret_code)
      };

      await new Verify({
        reason: 'CE',
        email: req.body.email,
        code: secret_code
      }).save();

      await mailer(data);
      res.status(201).json({ message: 'User registered!' });
    }
  }
  catch (e) {
    errorHandler(res, e);
  }
};

module.exports.getUser = async function (req, res) {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized!' });
    }

    const user = await User.findById({ _id: req.user.id });
    res.status(200).json({ name: user.name, user: user._id });
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.getConfirm = async function (req, res) {
  try {
    const data = await User.findById({ _id: req.user.id });

    if (data) {
      return res.status(200).json({ status: data.confirmedEmail });
    }
    else {
      res.status(401).json({ message: 'Unauthorized!' });
    }
  }
  catch (e) {
    errorHandler(res, e);
  }
};

module.exports.checkEmail = async function (req, res) {
  try {
    const candidate = await User.findOne({
      $or: [
        { email: req.params.data },
        { login: req.params.data }
      ]
    });

    if (candidate) {
      const secret_code = generator(12);

      let data = {
        outupEmail: config.outupEmail,
        email: candidate.email,
        subject: 'Password recovery',
        html: email.verification('This email was sent because you requested a password reset!', secret_code)
      };

      await new Verify({
        reason: 'PR',
        code: secret_code,
        email: candidate.email
      }).save();

      await mailer(data);

      return res.status(202).json({ status: true });
    }
    else {
      res.status(204).json({ status: false });
    }
  }
  catch (e) {
    errorHandler(res, e);
  }
};

module.exports.passwordReset = async function (req, res) {
  try {
    const candidate = await User.findById({ _id: req.params.id });

    if (candidate) {
      const salt = bcrypt.genSaltSync(10);

      await User.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { password: bcrypt.hashSync(req.body.password, salt) } },
        { $new: true }
      );

      return res.status(200).json({ message: 'Password changed. You can now log in with a new password!' })
    }
    else {
      res.status(404).json({ message: 'Incorrect data!' })
    }
  }
  catch (e) {
    errorHandler(res, e);
  }
};
