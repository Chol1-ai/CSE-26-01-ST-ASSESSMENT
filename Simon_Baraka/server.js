let express = require("express");
let route = require("./route");
let data = require("./database");
let cors = require("cors");
let app = express();
app.use(cors());

app.use(express.json());
data();
app.use("/api/registrations", route);

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server connection successful");
});
