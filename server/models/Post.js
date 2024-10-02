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
        parentClub: { // renamed from "club" to "parentClub" for consistency in the DB
            type: Schema.Types.ObjectId,
            ref: 'Club',
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
                validate: {
                    validator: function(v) {
                        return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
                    },
                    message: props => `${props.value} is not a valid URL!`
                },
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

const Post = model('Post', postSchema);

module.exports = Post;
