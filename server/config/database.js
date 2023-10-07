const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.DATABASE_URL; // Replace with your MongoDB URL and database name

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = mongoose;