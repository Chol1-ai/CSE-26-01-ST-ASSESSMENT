const Beneficiary = require("../model/Beneficiary");

exports.registerBeneficiary = async (req, res) => {

    try {

        const beneficiary = new Beneficiary(req.body);

        await beneficiary.save();

        res.status(201).json({
            message: "Registration successful"
        });

    } catch (error) {

        res.status(500).json({
            message: "Error registering beneficiary",
            error: error.message
        });

    }

};