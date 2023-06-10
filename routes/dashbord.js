const express = require('express');
const route = express.Router();

const { getDashboard, store, addInventory, sellerInventory } = require('../controller/dashbordController');
route.get('/', getDashboard);
route.get('/sellerinventory/:id', sellerInventory);
route.post('/storeInfo', store);
route.post('/addInventory', addInventory);

module.exports = route;