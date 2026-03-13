const express = require("express")
const cors = require("cors")

const connectDB = require("./config/db")
const beneficiaryRoutes = require("./routes/beneficiaries")

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

app.use("/api/beneficiaries",beneficiaryRoutes)

const PORT = 5000

app.listen(PORT,()=>{
console.log(`Server running on port ${PORT}`)
})