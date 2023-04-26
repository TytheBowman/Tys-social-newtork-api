const mongoose = require('mongoose');

const uri =
  process.env.MONGODB_URI || 'mongodb://67.8.77.184/Tys-social-network-api';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

module.exports = db;
