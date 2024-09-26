const { Schema, model } = require('mongoose');

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        blob: {
            type: Number,
            default: 0,
        },
        media: [
            {
                type: String,
            },
        ],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment',
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

const Post = model('Post', postSchema);

module.exports = Post; 