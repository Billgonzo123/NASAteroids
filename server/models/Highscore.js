const { Schema, model } = require('mongoose');

const highscoreSchema = new Schema({
  score: {
    type: Number,
  },
  user: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Highscore = model('Highscore', highscoreSchema);
module.exports = Highscore;
