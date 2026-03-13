require("dotenv").config()
const express = require("express")
const { dbconnect } = require("./config/dbconfig")
const { router } = require("./routes/regester.js")
const cors = require("cors")
const Port = 8000;

const app = express()
app.use(cors())
app.use(express.json())
app.use(router)

function startServer() {
    try {
        dbconnect()
        app.listen(Port, () => {
            console.log(`Server is running at port ${Port}`)
        })
    } catch (e) {
        console.error(e)
    }
}

startServer()

