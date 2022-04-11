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
    addUserHighscore: async (parent, { highscores }, context) => {
      if (context.user) {
        console.log("user", context.user);
        console.log("highscore", highscores);

        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { highscores: highscores } },
          { new: true, runValidators: true }
        );
        return user;
      }
    },
    addLeaderboardHighscore: async (parent, { highscore }, context) => {
      if (context.user) {
      const leaderboard = await Leaderboard.updateOne(
        { $push: { highscores: { user: context.user, highscore: highscore } } },
        { new: true, runValidators: true }
      );
      return leaderboard;
      }
    },
  },
};

module.exports = resolvers;
