// controllers/test-jwt.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');



router.get('/sign-token', (req, res) => {
  //res.json({ message: 'You are authorized!' });
  const user = {                                           // Mock user object
    _id: 1,
    username: 'test',
    password: 'test',
  };
  const token = jwt.sign({ user }, process.env.JWT_SECRET);          // Create a token using the sign method
  res.json({ token });                                               // Send the token back to the client
});

//-----------------We have successfully created a JWT and sent it to the client!---------------\\


router.post('/verify-token', (req, res) => {
    try { 
    //res.json({ message: 'Token is valid.' });
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //res.json({ token });
    res.json({ decoded });
  } catch(error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
  });


module.exports = router;
