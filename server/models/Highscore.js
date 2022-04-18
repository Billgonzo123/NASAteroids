const { Schema } = require('mongoose');

const highscoreSchema = new Schema({
  score: {
    type: Number,
    required: true,
  },
  user: {
    type: String,
    uppercase: true,
  },
  date: {
    type: String
  },
});

module.exports = highscoreSchema;
