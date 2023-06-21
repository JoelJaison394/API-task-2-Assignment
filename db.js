// db.js
const { MongoClient } = require('mongodb');
const config = require('./config');

let client;

async function connect() {
  try {
    client = new MongoClient(config.databaseURI);
    await client.connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Failed to connect to the database', error);
    process.exit(1);
  }
}

function getClient() {
  return client;
}

module.exports = {
  connect,
  getClient,
};
