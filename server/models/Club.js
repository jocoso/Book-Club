const { Schema, model } = require('mongoose');

const clubSchema = new Schema(
{
    name: {
        type: String,
        required: true, 
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    img: {
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
        },
        message: props => `${props.value} is not a valid URL!`,
      },
    },
    founder: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    members: [
    {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
  ],
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
},
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    toJSON: {
        virtuals: true,
    },
  }
);

// Index for unique club names
clubSchema.index({ name: 1 }, { unique: true });

// Virtual to get the number of members in the club
clubSchema.virtual('memberCount').get(function() {
    return this.members.length;
});

const Club = model('Club', clubSchema);

module.exports = Club;
