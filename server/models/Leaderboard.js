const { Schema, model } = require('mongoose');

const leaderboardSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
      unique: true,
    },

    score: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Leaderboard = model('Leaderboard', leaderboardSchema);
module.exports = Leaderboard;
