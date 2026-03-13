const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

app.post("/register",(req,res)=>{

const {name,email,password,dob,gender,nationality} = req.body

if(!name || !email || !password || !dob || !gender || !nationality){
return res.json({message:"All fields are required"})
}

if(password.length < 6){
return res.json({message:"Password must be at least 6 characters"})
}

if(!email.includes("")){
return res.json({message:"Invalid email"})
}

res.json({message:"Registration successful"})

})

app.listen(3000,()=>{
console.log("Server running on port 3000")
})