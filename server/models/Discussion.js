const { Schema, model } = require('mongoose');

const discussionSchema = new Schema({
    topic: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    toJSON: {
        virtuals: true,
    },
});

const Discussion = model('Discussion', discussionSchema);

module.exports = Discussion;