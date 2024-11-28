// /controllers/users.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

const SALT_LENGTH = 12;

router.post('/signup', async (req, res) => {
    //res.json({ message: 'Signup route is working' });
    try {
        const userInDatabase = await User.findOne({ username: req.body.username });
        if (userInDatabase) {
            return res.status(400).json({error:'Username already taken.'})
        }
        const user = await User.create({                               // Create a new user with hashed password.
            username: req.body.username,
            hashedPassword: bcrypt.hashSync(req.body.password, SALT_LENGTH)
        })                   
        res.status(201).json({ user });
    } catch(error) {
        res.status(400).json({ error: error.message })
    }
});






module.exports = router;

