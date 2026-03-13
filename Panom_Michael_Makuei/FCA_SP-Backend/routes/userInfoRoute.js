const path = require('path');
const express = require('express');
const router = express.Router();
const UserInfo = require(path.join(__dirname, '..', 'models', 'userInfo'));

// Adding new user information
router.post('/register', async (req, res) => {

    try {
        const {
            firstname,
            lastname,
            placeOfBirth,
            dateOfBirth,
            gender,
            nationality,
            maritalStatus,
            settlement,
            dateOfjoining
        } = req.body;

        let errors = {};

        // required field validations
        if (!firstname) errors.firstname = "This field is required";
        if (!lastname) errors.lastname = "This field is required";
        if (!placeOfBirth) errors.placeOfBirth = "This field is required";
        if (!dateOfBirth) errors.dateOfBirth = "This field is required";
        if (!nationality) errors.nationality = "This field is required";
        if (!maritalStatus) errors.maritalStatus = "This field is required";
        if (!settlement) errors.settlement = "This field is required";
        if (!dateOfjoining) errors.dateOfjoining = "This field is required";

        // Length validation
        if (firstname && firstname.length < 2)
            errors.firstname = "Invalid field";

        if (lastname && lastname.length < 2)
            errors.lastname = "Invalid field";

        if (placeOfBirth && placeOfBirth.length < 2)
            errors.placeOfBirth = "Invalid field";

        // Date validation
        if (dateOfBirth && new Date(dateOfBirth) >= new Date())
            errors.dateOfBirth = "Invalid field";

        if (dateOfjoining && new Date(dateOfjoining) > new Date())
            errors.dateOfjoining = "Invalid field";

        // If errors exist
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }

        const newUserInfo = new UserInfo({
            firstname,
            lastname,
            placeOfBirth,
            dateOfBirth,
            gender,
            nationality,
            maritalStatus,
            settlement,
            dateOfjoining
        });

        await newUserInfo.save();

        res.status(201).json({
            message: "User registered successfully",
            userInfo: newUserInfo
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;