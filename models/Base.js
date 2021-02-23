const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const baseSchema = new Schema({
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    name: {
        type: String,
        required: true
    },
    video: {
        type: String,
        default: ''
    },
    use: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('bases', baseSchema);