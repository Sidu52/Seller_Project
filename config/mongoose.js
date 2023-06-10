const mongoose = require('mongoose');
const URL = "mongodb://127.0.0.1:27017/Seller";

mongoose.connect(URL);
const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

db.once('open', () => {
    console.log("Connected to Database :: MongoDB")
});

module.exports = db;