const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supportSchema = new Schema({
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    theme: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('supports', supportSchema);