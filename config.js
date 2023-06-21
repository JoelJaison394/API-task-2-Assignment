
require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    databaseURI: process.env.MONGO_URI,
  };
  