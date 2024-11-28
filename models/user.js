// models/user.js

const mongoose = require('moongose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    hashedPassword: {
        type: String,
        required: true,
    }
})

const User = mongoose.model('User', userSchema); 

module.exports = User;