const { Schema, model } = require('mongoose');

const leaderboardSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },

        highscore: {
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