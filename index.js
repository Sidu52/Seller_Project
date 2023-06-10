require('dotenv').config();
require('./config/mongoose');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const session = require('express-session')
const bodyParser = require('body-parser')

app.use(express.json()); // Parse Json data from body
app.use(cookieParser());// Parse cookies data read
// app.use(express.urlencoded({ extended: true }));// Parse URL-Encoded body

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());// Resourse Sharing in two server
app.use(express.static('./public'));
// Set EJS view engine and path
app.set('view engine', 'ejs');
app.set('views', './views');

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Set up session middleware
app.use(
    session({
        secret: 'ss',
        resave: false,
        // saveUninitialized: true
    })
);

//Routers
app.use('/seller', require('./routes/seller'));
app.use('/', require('./routes/dashbord'));


// Server Start
app.listen(PORT, (error) => {
    if (error) (console.log("Error When we start server"))
    console.log(`Server is running on port ${PORT}`);
});