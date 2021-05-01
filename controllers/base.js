const Base = require('../models/Base');
const errorHandler = require('../utils/errorHandler');
const serverPath = require('../localPath');

const fs = require('fs');
const path = require('path');

module.exports.createExercise = async function (req, res) {
    try {
        const base = await new Base({
            user: req.user.id,
            name: req.body.name,
            video: req.file ? req.file.path : ''
        }).save();

        res.status(201).json(base);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.getAllExercises = async function (req, res) {
    try {
        const base = await Base.find({ user: req.user.id });

        res.status(200).json(base);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.getExercise = async function (req, res) {
    try {
        const base = await Base.findById(req.params.id);

        res.status(200).json(base);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.deleteExercise = async function (req, res) {
    try {
        const base = await Base.findById(req.params.id);

        if (base.use > 0) {
            return res.status(403).json({ message: 'You cannot delete this exercise because it is in use!' });
        }

        fs.unlink(path.resolve(serverPath.path, base.video), async (err) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to delete exercise!' });
            }
            else {
                await Base.findOneAndDelete({ _id: req.params.id });
                res.status(200).json({ message: 'Exercise deleted!' });
            }
        });
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.updateUse = async function (req, res) {
    try {
        const base = await Base.findByIdAndUpdate(
            { _id: req.body.id },
            { $inc: { use: 1 } },
            { new: true }
        );

        res.status(200).json({ message: 'Updated!' });
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.update = async function (req, res) {
    try {
        const compare = await Base.findById(req.params.id);

        if (req.file) {
            fs.unlink(path.resolve(serverPath.path, compare.video), async (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Failed to update exercise!' });
                }
                else {
                    const base = await Base.findByIdAndUpdate(
                        { _id: req.params.id },
                        { $set: { name: req.body.name, video: req.file.path } },
                        { new: true }
                    );

                    return res.status(200).json({ message: 'Updated!' });
                }
            });
        }
        else {
            const base = await Base.findByIdAndUpdate(
                { _id: req.params.id },
                { $set: { name: req.body.name } },
                { new: true }
            );

            res.status(200).json({ message: 'Updated!' });
        }
    } catch (e) {
        errorHandler(res, e);
    }
}
