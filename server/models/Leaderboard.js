const { Schema, model } = require('mongoose');
const highscoreSchema = require('./Highscore');

const leaderboardSchema = new Schema(
  {
    highscores: [highscoreSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Leaderboard = model('Leaderboard', leaderboardSchema);
module.exports = Leaderboard;
