const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        businessName: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        storeInfo: {
            address: String,
            gst: String,
            image: String,
            storeTiming: String,
        },
        inventory: [
            {
                category: String,
                subCategory: String,
                productName: String,
                MRP: Number,
                SP: Number,
                quantity: Number,
                images: String,
            },
        ]
    },
    { timestamps: true } // Enable timestamps for automatic creation of createdAt and updatedAt fields
);

const Seller = mongoose.model("Seller", sellerSchema);
module.exports = Seller;