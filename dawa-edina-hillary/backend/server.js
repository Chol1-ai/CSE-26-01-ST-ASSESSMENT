require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const beneficiariesRoutes = require("./routes/beneficiaries");

const app = express();

app.use(cors());
app.use(express.json());

const frontendRoot = path.join(__dirname, "..", "frontend");
const pagesRoot = path.join(frontendRoot, "pages");
app.use(express.static(frontendRoot));
app.use(express.static(pagesRoot));

app.get("/", (req, res) => {
    res.sendFile(path.join(pagesRoot, "index.html"));
});

app.get("/registration.html", (req, res) => {
    res.sendFile(path.join(pagesRoot, "registration.html"));
});

app.use("/api/beneficiaries", beneficiariesRoutes);

const PORT = process.env.PORT || 3000;
const MONGO_URI =
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/fca_refugee_support";

const startServer = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB.");
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to connect to MongoDB.", error);
        process.exit(1);
    }
};

startServer();
