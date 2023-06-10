const Seller = require("../models/Seller");

function getSignUpPage(req, res) {
    res.render('signUp');
}

function getSignInPage(req, res) {
    res.render('signIn');
}

function logout(req, res) {
    res.clearCookie("sellerId");
    return res.redirect("/"); // Redirect to the login page or any other desired page
}

async function signUp(req, res) {
    const { email, businessName, password, confirmPassword } = req.body;
    try {
        // Check seller exist or not 
        const seller = await Seller.findOne({ email });
        if (seller) {
            return res.status(400).json({ Error: "Seller already register plz signUp" });
        } else if (password != confirmPassword) {
            return res.status(400).json({ Error: "Password Not Match" });
        }
        // If seller not exist Seller create
        const newSeller = new Seller({
            email,
            businessName,
            password
        });
        await newSeller.save();
        // Store the newSeller._id in a cookie
        res.cookie("sellerId", newSeller._id, { maxAge: 86400000 }); // Expires in 24 hours
        return res.status(200).redirect('/seller');
    } catch (error) {
        return res.status(500).json({ Error: error })
    }
}

//Seller SignIn
async function signIn(req, res) {
    const { email, password } = req.body;
    try {
        const seller = await Seller.findOne({ email });
        if (!seller && password != seller.password) {
            return res.status(400).json({ message: "Invalid Email Password" });
        }
        // req.session.sellerId = seller._id;
        // Store the newSeller._id in a cookie
        res.cookie("sellerId", seller._id, { maxAge: 86400000 }); // Expires in 24 hours
        res.status(200).redirect('/seller');
    } catch (error) {
        console.log(error)
        return res.status(500).json({ Error: error })
    }
}

module.exports = { getSignInPage, getSignUpPage, signUp, signIn, logout }

