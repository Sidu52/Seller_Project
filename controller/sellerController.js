const Seller = require("../models/Seller");

function getSignUpPage(req, res) {
    res.render('signUp');
}

function getSignInPage(req, res) {
    res.render('signIn');
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

        // res.status(200).json({ Message: "Seller Register Sucessfully" })
        req.session.sellerId = newSeller._id;
        res.status(200).redirect('/');
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
        req.session.sellerId = seller._id;
        res.status(200).redirect('/');
    } catch (error) {
        console.log(error)
        return res.status(500).json({ Error: error })
    }
}

module.exports = { getSignInPage, getSignUpPage, signUp, signIn }

