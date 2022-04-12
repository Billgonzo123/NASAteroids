const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/NASAteroids', 
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
