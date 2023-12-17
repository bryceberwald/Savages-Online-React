// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const UserSchema = new Schema({
//     username: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//     },
//     password:{
//         type: String,
//         required: true,
//     },
// });

// module.exports = mongoose.model('User', UserSchema);
const mongoose = require('mongoose');
const { Schema } = mongoose;

const CharacterSchema = new Schema({
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    frame: { type: Number, required: true }, // Assuming 'facing' can be a string like 'north', 'south', 'east', 'west'
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
    character: CharacterSchema, // Embedding the Character schema inside the User schema
});

module.exports = mongoose.model('User', UserSchema);
