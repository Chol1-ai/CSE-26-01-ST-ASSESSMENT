const express = require("express");
const {registerModel} = require("../model.js")

const router = express.Router()

router.post("/", async (req, res) => {
    try {
        const body = req.body;

        const registerData = await registerModel.create(body);

        res.status(201).json({message:"Beneficiary Registerd successfully" , registerData})
    } catch (error) {
        res.status(500).json({message:"Server Error", error})
    }
})

module.exports = {router}