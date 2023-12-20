const mongoose = require('mongoose');
const { Schema } = mongoose;

const CharacterSchema = new Schema({
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    frame: { type: Number, required: true },
    level: { type: Number, required: true },
});

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    character: CharacterSchema,
});

module.exports = mongoose.model('User', UserSchema);