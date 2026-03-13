const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "..", "db", "database.json");

const readDatabase = () => {
    const raw = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(raw);
};

const writeDatabase = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

module.exports = {
    readDatabase,
    writeDatabase
};
