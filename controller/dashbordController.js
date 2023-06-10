const Seller = require("../models/Seller");
const Inventory = require("../models/Inventory");

async function getDashboard(req, res) {
    const sellerId = req.session.sellerId;
    const sellerCard = await Inventory.find({ sellerId });
    res.render('dashbord', { sellerCard, sellerId });
}

async function store(req, res) {
    try {
        const sellerId = req.session.sellerId;
        const { address, gst, image, storeTiming } = req.body;

        console.log("SEller id", req.body)

        const seller = await Seller.findByIdAndUpdate(
            sellerId, {
            storeInfo: {
                address,
                gst,
                image,
                storeTiming
            },
        });
        if (!seller) {
            return res.status(404).json({ error: "Seller not found" });
        }
        return res.status(200).redirect('back');
    } catch (error) {
        console.log(error)
        return res.status(500).json({ Error: error });
    }
};

async function addInventory(req, res) {
    const sellerId = req.session.sellerId;
    try {
        const { category, subCategory, productName, MRP, SP, quantity, images } = req.body;
        console.log(req.body)
        const newInventory = await Inventory.create({
            sellerId,
            category,
            subCategory,
            productName,
            MRP,
            SP,
            quantity,
            images,
        });

        const seller = await Seller.findByIdAndUpdate(
            sellerId,
            { $push: { inventory: newInventory } },
            { new: true }
        );
        if (!seller) {
            return res.status(404).json({ error: "Seller not found" });
        }
        return res.status(200).redirect('back');
    } catch (error) {
        return res.status(500).json({ Error: error })
    }
}

async function sellerInventory(req, res) {
    const sellerId = req.params.id;

    try {
        const seller = await Seller.findById(sellerId);
        let inventory = seller.inventory;
        return res.render('seller', { seller, inventory });
        // return res.status(200).json({
        //     Message: "Seller Inventory",
        //     data: inventory
        // });
    } catch (error) {
        return res.status(500).json({ Error: "error" })
    };
}

module.exports = { getDashboard, store, addInventory, sellerInventory };