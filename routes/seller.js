const express = require('express');
const route = express.Router();

const { getSignInPage, getSignUpPage, signUp, signIn, logout } = require('../controller/sellerController');

route.get('/', getSignInPage);
route.get('/signUp', getSignUpPage);
route.post('/signup', signUp);
route.post('/signIn', signIn);
route.get('/logout', logout);

module.exports = route;

