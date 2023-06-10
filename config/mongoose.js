const mongoose = require('mongoose');
const URL = process.env.URL;
mongoose.connect(URL);
const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

db.once('open', () => {
    console.log("Connected to Database :: MongoDB")
});

module.exports = db;