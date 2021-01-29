const Support = require('../models/Support');
const errorHandler = require('../utils/errorHandler');

module.exports.createSupportRequest = async function (req, res) {
    try {
        const support = await new Support({
            user: req.user.id,
            theme: req.body.theme,
            description: req.body.description
        }).save();

        res.status(201).json(support);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.getAllSupportRequest = async function (req, res) {
    try {
        const support = await Support.find({ user: req.user.id });

        res.status(200).json(support);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.getSupportRequest = async function (req, res) {
    try {
        const support = await Support.findById(req.params.id);

        res.status(200).json(support);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.deleteSupportRequest = async function (req, res) {
    try {
        await Support.findByIdAndDelete({ _id: req.params.id});
        
        res.status(200).json({message: 'Support request deleted!'});
    } catch (e) {
        errorHandler(res, e);
    }
}