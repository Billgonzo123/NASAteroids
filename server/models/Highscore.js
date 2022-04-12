const { Schema } = require('mongoose');

// This is a subdocument schema for the leaderboard model
const highscoreSchema = new Schema({
  user: {
    type: String,
    required: true,
    unique: true,
  },
  score: {
    type: Number,
    required: true,
  },
});

module.exports = highscoreSchema;
