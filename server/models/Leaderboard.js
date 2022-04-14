const { Schema, model } = require('mongoose');
const Highscore = require('./Highscore');

const leaderboardSchema = new Schema(
  {
    highscores: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Highscore'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Leaderboard = model('Leaderboard', leaderboardSchema);
module.exports = Leaderboard;
