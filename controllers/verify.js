const User = require('../models/User');
const Verify = require('../models/Verify');
const errorHandler = require('../utils/errorHandler');

module.exports.compare = async function (req, res) {
    try {
        const candidate = await Verify.findOne({ code: req.params.code });

        if (candidate) {
            await User.findByIdAndUpdate(
                { _id: req.user.id },
                { $set: { confirmedEmail: true } },
                { new: true }
            );
            await Verify.findByIdAndDelete({ _id: candidate._id });

            return res.status(200).json({ message: 'Email address confirmed!' });
        }
        else {
            res.status(406).json({ message: 'Invalid code!' });
        }
    }
    catch (e) {
        errorHandler(res, e);
    }
};

module.exports.resetPassword = async function (req, res) {
    try {
        const candidate = await Verify.findOne({ code: req.params.code });

        if (candidate) {
            const data = await User.findOne({ email: candidate.email });
            await Verify.findByIdAndDelete({ _id: candidate._id });

            return res.status(200).json(data._id);
        }
        else {
            res.status(204).json({ message: 'The application was not accepted!' });
        }
    }
    catch (e) {
        errorHandler(res, e);
    }
};