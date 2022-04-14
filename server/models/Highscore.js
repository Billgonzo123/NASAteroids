const { Schema } = require('mongoose');

const highscoreSchema = new Schema({
  score: {
    type: Number,
    required: true,
  },
  user: {
    type: String,
  },
  date: {
    type: String
  },
});

module.exports = highscoreSchema;
