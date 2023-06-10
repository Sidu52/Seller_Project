const express = require('express');
const route = express.Router();

const { getSignInPage, getSignUpPage, signUp, signIn } = require('../controller/sellerController');

route.get('/signIn', getSignInPage);
route.get('/signUp', getSignUpPage);
route.post('/signup', signUp);
route.post('/signIn', signIn);

module.exports = route;

