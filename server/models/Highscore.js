const { Schema } = require('mongoose');

// This is a subdocument schema for the leaderboard model
const highscoreSchema = new Schema({
  user: {
    type: String
  },
  score: {
    type: Number
  },
});

module.exports = highscoreSchema;
