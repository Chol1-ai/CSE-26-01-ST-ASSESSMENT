const express = require("express");
const cors = require("cors")
require("dotenv").config()

const app = express()

const {connectToDB} = require("./mongoDb-fca.js")
connectToDB()

const { router: register} = require("./Routes/registerRoute.js")

app.use(cors());

app.use(express.json());

app.use("/register", register)



const PORT = process.env.PORT || 3050
app.listen(PORT, (err) => {
    if (err) {
        console.log("Server error");
    } else {
        console.log("running on port 3000")
    }
})