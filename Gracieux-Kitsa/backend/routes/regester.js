const router = require("express").Router()
const mongoose = require("mongoose")
const { userModel } = require("../models/userModel.js")

router.post("/register", async (req, res) => {
    try {
        const now = new Date()
        const body = req.body || {}

        const fname = (body.fname || "").trim()
        const lname = (body.lname || "").trim()
        const pob = (body.pob || "").trim()
        const dob = body.dob ? new Date(body.dob) : null
        const joining = body.joining ? new Date(body.joining) : null
        const gender = body.gender || "Female"
        const nationality = body.nationality || ""
        const marital = body.marital || ""
        const settlement = body.settlement || ""

        if (fname.length < 2) return res.status(400).json({ message: "First name must be at least 2 characters" })
        if (lname.length < 2) return res.status(400).json({ message: "Last name must be at least 2 characters" })
        if (pob.length < 2) return res.status(400).json({ message: "Place of birth must be at least 2 characters" })
        if (!dob || isNaN(dob.getTime())) return res.status(400).json({ message: "Invalid date of birth" })
        if (!joining || isNaN(joining.getTime())) return res.status(400).json({ message: "Invalid date of joining" })
        if (!(dob.getTime() < now.getTime())) return res.status(400).json({ message: "Date of birth must be before date of registration" })
        if (!(joining.getTime() > now.getTime())) return res.status(400).json({ message: "Date of joining must be after date of registration" })
        if (!nationality) return res.status(400).json({ message: "Select nationality" })
        if (!marital) return res.status(400).json({ message: "Select marital status" })
        if (!settlement) return res.status(400).json({ message: "Select settlement camp" })

        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({ message: "database unavailable" })
        }

        const payload = {
            firstname: fname,
            lastname: lname,
            dateofbirth: body.dob,
            placeofbirth: pob,
            gender,
            nationality,
            maritalstatus: marital,
            settlementcamp: settlement,
            dateofjoining: body.joining
        }

        const user = await userModel.create(payload)
        res.status(201).json({ message: "user created successfully", body: user })
    } catch (err) {
        res.status(400).json({ message: "failed to create a user" })
    }
})

module.exports = { router }
