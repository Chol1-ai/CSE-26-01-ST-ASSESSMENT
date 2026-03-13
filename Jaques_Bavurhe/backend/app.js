const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();


require("dotenv").config();

const PORT = process.env.PORT || 3000;
const URI = process.env.MONGODB_URI;

// Importing routes
const beneficiaryRoutes = require("./routers/authRoutes");
const indexRoutes = require("./routers/indexRoutes");


//Database connection
mongoose.connect(URI).catch((error) => {
  console.error(`Initial MongoDB connection failed: ${error.message}`);
});
mongoose.connection
  .once("open", () => {
    console.log("Mongoose connection open!!");
  })
  .on("error", (error) => {
    console.error(`Connection error:${error.message}`);
  });


app.use(express.json());

//serving static files
const frontendPath = path.join(__dirname, "..", "frontend");
app.use(express.static(frontendPath));
app.use(express.urlencoded({ extended: true }));

//using routes
app.use("/", indexRoutes);

app.use("/beneficiaries", beneficiaryRoutes);



//boostraping the server 
app.listen(PORT, () => {
  try {
    console.log(`Server is running on port ${PORT}`);
  } catch (err) {
    console.error("Error starting server:", err);
  }
});
