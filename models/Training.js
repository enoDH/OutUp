const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trainingSchema = new Schema({
    owner: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    users: [
        {
            ref: 'users',
            type: Schema.Types.ObjectId
        }
    ],
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        default: ''
    },
    countWeek: {
        type: Number,
    },
    countDay: {
        type: Number,
    },
    weeks: [
        {
            days: [
                {
                    exercises: [
                        {
                            exercise: {
                                ref: 'bases',
                                type: Schema.Types.ObjectId
                            },
                            status: {
                                type: Boolean,
                                default: true
                            },
                            reps: [
                                {
                                    type: String
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    key: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('trainings', trainingSchema);