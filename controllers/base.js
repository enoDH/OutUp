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
        
        fs.unlink( path.resolve( serverPath.path, base.video), async (err) => {
            if (err) {
                res.status(500).json({message: 'Failed to delete exercise!'});
            }
            else {
                await Base.findOneAndDelete({_id: req.params.id});
                res.status(200).json({message: 'Exercise deleted!'});
            }
        });
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.updateUse = async function (req, res) {
    try {
        const updated = {
            use: req.body.use
        };

        const base = await Base.findByIdAndUpdate(
            { _id: req.body.id },
            { $set: updated },
            { new: true }
        );

        res.status(200).json(base);
    } catch (e) {
        errorHandler(res, e);
    }
}

// module.exports.update = async function (req, res) {
//     try {
//         const updated = {
//             name: req.body.name
//         };

//         const position = await Position.findByIdAndUpdate(
//             { _id: req.params.id },
//             { $set: updated },
//             { new: true }
//         );

//         res.status(200).json(position);
//     } catch (e) {
//         errorHandler(res, e);
//     }
// }