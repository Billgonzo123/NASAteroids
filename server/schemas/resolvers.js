const { AuthenticationError } = require('apollo-server-express');
const { User, Leaderboard } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          '-__v -password'
        );
        return userData;
      }
      throw new AuthenticationError('🛸 Not logged in');
    },
    users: async () => {
      return User.find();
    },
    leaderboard: async () => {
      return Leaderboard.findOne();
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('🛸 Incorrect credentials');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('🛸 Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
    addUserHighscore: async (parent, { score }, context) => {
      if (context.user) {
        const highscore = {
          score: score,
          user: context.user.username,
          date: new Date().toLocaleDateString('en-US'),
        };

        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { highscores: highscore } }
        );

        //sort descending
        const sortedUser = user.highscores.sort((a, b) => b.score - a.score);

        return { _id: user._id, highscores: sortedUser };
      }
    },
    addLeaderboardHighscore: async (parent, { score }, context) => {
      //query all leaderboards
      const all = await Leaderboard.findOne();

      // construct highscore object
      const highscore = {
        score: score,
        user: context.user.username,
        date: new Date().toLocaleDateString('en-US'),
      };

      // If a leaderboard doesn't already exist and logged in, create leaderboard
      if (all instanceof Leaderboard == false && context.user) {
        //create new board with highscore object info
        const newBoard = Leaderboard.create(highscore);
        return newBoard;
      }
      //else update existing board
      else if (context.user) {
        //add new score
        const leaderboard = await Leaderboard.findOneAndUpdate(
          { _id: all._id },
          { $push: { highscores: highscore } }
        );

        //sort descending
        const sortedBoard = leaderboard.highscores.sort(
          (a, b) => b.score - a.score
        );

        return { _id: leaderboard._id, highscores: sortedBoard };
      }
    },
    deleteUserScore: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id });

        const scores = user.highscores.map((highscore) => highscore.score);
        const lowestScore = Math.min(...scores);
        const index = scores.indexOf(lowestScore);
        console.log(user.highscores[index]);

        const removeScore = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { highscores: user.highscores[index] } }
        );
        return removeScore;
      } else {
        console.log('need to be logged in!');
      }
    },
    deleteLeaderboardHighscore: async (parent, args, context) => {
      //query all leaderboards
      const all = await Leaderboard.findOne();

      //find lowest score index
      const scores = all.highscores.map((highscore) => highscore.score);
      const lowestScore = Math.min(...scores);
      const index = scores.indexOf(lowestScore);

      // If a leaderboard doesn't exist, throw error
      if (all instanceof Leaderboard == false && context.user) {
        console.log('No leaderboard yet!');
      }
      //else update existing board
      else if (context.user) {
        const updatedLeaderboard = await Leaderboard.findOneAndUpdate(
          { _id: all._id },
          { $pull: { highscores: all.highscores[index] } }
        );
        return updatedLeaderboard;
      }
    },

    replaceLeaderboardHighscore: async (parent, { score }, context) => {
      console.log('newScore:', context.user.username, ' ; ', score)
      if (context.user) {
        const all = await Leaderboard.findOne();

        const updatedLeaderboard = await Leaderboard.findOneAndUpdate(
          { _id: all._id },
          { $set: {"highscores.$[i].score": score } },
          { 
            arrayFilters: [
              {
                "i.user": context.user.username
              }
            ]
          }
        );
        return updatedLeaderboard;
      }
    },
  },
};

module.exports = resolvers;
