const express = require("express")
const connectDB = require("./mongodb-server");
const app = express()

app.use(express.json())


app.listen(PORT,()=>{
    console.log(`Server is running successfully on port ${PORT}`)
})