const db = require("mongoose")

 //trying to connect to the database
const dbconnect = ()=>{
    try{
      db.connect(process.env.Mongo_URI)
    .then(() => {
        console.log("Connect to mongo db")
    })
    .catch((err) => {
        console.log(err)
    })
    }catch(e){
        console.log(e)
    }
}

module.exports = {dbconnect}