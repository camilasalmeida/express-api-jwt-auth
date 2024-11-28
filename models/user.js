// models/user.js

const mongoose = require('mongoose');

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

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {                         // We will use `transform` to delete the field `hashedPassword` from the document. `transform` expects a callback function, and it will pass that callback function two arguments: 1- The original document from the database and 2- What is returned when the function is run.
        delete returnedObject.hashedPassword;
    }
});

const User = mongoose.model('User', userSchema); 

module.exports = User;