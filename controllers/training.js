const Training = require('../models/Training');
const errorHandler = require('../utils/errorHandler');
const generate = require('../utils/generator');

module.exports.create = async function (req, res) {
    try {
        const training = await new Training({
            user: req.user.id,
            name: req.body.name,
            description: req.body.description,
            date: req.body.date,
            countWeek: req.body.countWeek,
            countDay: req.body.countDay,
            weeks: JSON.parse(req.body.weeks),
            image: req.file ? req.file.path : '',
            key: generate()
        }).save();

        res.status(201).json(training);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getAll = async function (req, res) {
    try {
        const training = await Training.find({ user: req.user.id });

        res.status(200).json(training);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getById = async function (req, res) {
    try {
        const training = await Training.findById(req.params.id);

        res.status(200).json(training);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.delete = async function (req, res) {
    try {
        await Training.findByIdAndDelete({ _id: req.params.id });

        res.status(200).json({ message: 'Workout deleted!' });
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async function (req, res) {
    try {
        const training = await Training.findById(
            { _id: req.body._id }
        );

        let weeks = training.weeks;
        let i = 0, str = '';
        for (let days of weeks) {
            let j = 0;
            for (let exercises of days['days']) {
                let t = 0;
                for (let exercise of exercises['exercises']) {
                    if (exercise['_id'] == req.body.exerciseId) {
                        str = "weeks." + i + ".days." + j + ".exercises." + t + ".status";
                    }
                    t++;
                }
                j++;
            }
            i++;
        }

        
        const workout = await Training.findByIdAndUpdate(
            { _id: req.body._id },
            { $set: { [str]: req.body.status }},
            { new: true });

        res.status(200).json(workout);
    } catch (e) {
        errorHandler(res, e);
    }
};