const { MongoClient } = require('mongodb');

const DEFAULT_URI = 'mongodb://localhost:27017/ASSESSMENT';

let client;
let db;

async function connectDb() {
  if (db) {
    return db;
  }

  const uri = process.env.MONGO_URI || DEFAULT_URI;
  client = new MongoClient(uri);
  await client.connect();
  db = client.db();
  return db;
}

function getDb() {
  if (!db) {
    throw new Error('Database not connected. Call connectDb() first.');
  }
  return db;
}

async function closeDb() {
  if (client) {
    await client.close();
    client = undefined;
    db = undefined;
  }
}

module.exports = {
  connectDb,
  getDb,
  closeDb
};
