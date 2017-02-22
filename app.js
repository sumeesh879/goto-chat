const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./config/database');

//Connect to database
mongoose.connect(config.database);

//On connection
mongoose.connection.on("connected", () => {
    console.log("Connected to Database " + config.database);
});

//Database Error
mongoose.connection.on("err", (err) => {
    console.log(err);
});

const port = 3000;

const app = express();

const users = require('./routes/users');

//CORS Middleware
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//bodyParser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Calling passport.js with parameter passport to the function
require('./config/passport')(passport);

//for all user routes
app.use('/users', users);

//Index Route
app.get('/', (req, res) => {
    res.send("home page")
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//Start Server
app.listen(process.env.PORT || port, () => {
    console.log("Server Starting on port " + port);
});