// /controllers/users.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const SALT_LENGTH = 12;                       

router.post('/signup', async (req, res) => {
    //res.json({ message: 'Signup route is working' });
    try {
        const userInDatabase = await User.findOne({ username: req.body.username });            // Checks if the username is already taken
        if (userInDatabase) {
            return res.status(400).json({error:'Username already taken.'})
        }
        const user = await User.create({                                                       // Create a new user with hashed password.
            username: req.body.username,
            hashedPassword: bcrypt.hashSync(req.body.password, SALT_LENGTH)
        })          
        const token = jwt.sign(                                                                 // This code will automatically authenticate the new user after signUp.
            { username: user.username, _id: user._id },
            process.env.JWT_SECRET
        )         
        res.status(201).json({ user, token });
    } catch(error) {
        res.status(400).json({ error: error.message })
    }
});

router.post('/signin', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user && bcrypt.compareSync(req.body.password, user.hashedPassword)) {
            const token = jwt.sign(
                { username: user.username, _id: user._id },
                process.env.JWT_SECRET
            );
            //res.json({ message: 'You are authorized' });
            res.status(201).json({ token });
            
        } else {
            //res.json({ message: 'Invalid credentials.' })
            res.status(401).json({ error: 'Invalid username or password.'})
        }
    } catch(error) {
        res.status(400).json({ error: error.message })
    }
})


module.exports = router;

