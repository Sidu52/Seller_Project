require('dotenv').config();
require('./config/mongoose');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')

app.use(express.json()); // Parse Json data from body
app.use(cookieParser());// Parse cookies data read
// app.use(express.urlencoded({ extended: true }));// Parse URL-Encoded body

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', './views');

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//Routers
app.use('/', require('./routes/seller'));
app.use('/seller', require('./routes/dashbord'));


// Server Start
app.listen(PORT, (error) => {
    if (error) (console.log("Error When we start server"))
    console.log(`Server is running on port ${PORT}`);
});