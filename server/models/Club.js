const { Schema, model } = require('mongoose');

const clubSchema = new Schema({
    clubName: {
        type: String,
        required: true, 
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required:true,
        trim: true,
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    discussions: [{
        type: Schema.Types.ObjectId,
        ref: 'Discussion',
    }],
}, {
    toJSON: {
        virtuals: true,
    },
});

// Virtual to get the number of members in the club
clubSchema.virtual('memberCount').get(function() {
    return this.members.length;
});

const Club = model('Club', clubSchema);

module.exports = Club;