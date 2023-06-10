const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema(
    {
        sellerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Seller',
        },
        category: {
            type: String
        },
        subCategory: {
            type: String
        },
        productName: {
            type: String,
            required: true,
        },
        MRP: {
            type: Number,
            required: true,
        },
        SP: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        images: String,
    },
    { timestamps: true }
);

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;