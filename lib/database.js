const mongoose = require('mongoose');
const DATABASE_URI = 'mongodb://localhost/nodepop';

mongoose.connect(DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const database = mongoose.connection;

database.on('error', console.error.bind(console, 'Connection error:'));
database.on('open', () => {
  console.log('Connection success');
});

module.exports = database;
