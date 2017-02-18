const express = require('express');
const router = express.Router();

//Register

router.get('/register', (req, res, next) => {
    res.send("Register Page")
});

//Authenticate

router.post('/authenticate', (req, res, next) => {
    res.send("Authenticate Page")
});

//Profile

router.get('/profile', (req, res, next) => {
    res.send("Profile Page")
});

//Validate

router.get('/validate', (req, res, next) => {
    res.send("Validation Page")
});

module.exports = router;