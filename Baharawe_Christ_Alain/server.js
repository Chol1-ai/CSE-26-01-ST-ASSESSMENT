const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json())

// Connecting to Mongo
mongoose.connect("mongodb://127.0.0.1:27017/refugeeDB")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err))

// schema
const beneficiarySchema = new mongoose.Schema({
firstName:
{
 type: String,
minlenth:3

},

lastName:String,
dob:{
    String,
},
placeBirth:

{type:String,

},
gender:{
    type :String

},
nationality:{type :String,
},
maritalStatus:{String,

}
,
camp:{String,

},

joinDate:{
    type: String}

})

const Beneficiary = mongoose.model("Beneficiary", beneficiarySchema)


// router
app.post("/register", async (req,res)=>{

try{

const newBeneficiary = new Beneficiary(req.body)

await newBeneficiary.save()

res.send("Registration Successful")

}catch(err){

res.status(500).send("Error saving data")
}
})

app.listen(3000,()=>{
console.log("Server running on port 3000")
})