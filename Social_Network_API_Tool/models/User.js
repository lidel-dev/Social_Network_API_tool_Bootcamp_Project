const { Schema, model } = require('mongoose');

//Schema to create User model
const userSchema = new Schema(
    {
        thoughts: {
            type: Schema.Types.ObjectId,
            ref: "Thought",
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        //HELP what do i do here for buddies
        buddies: {
            type: String,
            required: true,
        },
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const User = model('user', userSchema);

module.exports = User;
