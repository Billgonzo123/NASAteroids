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
    leaderboard: async () => {
      return Leaderboard.find();
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
        console.log('user', context.user);
        console.log('highscore', highscores);

        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { highscores: highscores } },
          { new: true, runValidators: true }
        );
        return user;
      }
    },
    addLeaderboardHighscore: async (parent, { data }, context) => {
      //query all leaderboards
      const all = await Leaderboard.findOne();
      console.log('all', all);

      // If a leaderboard doesn't already exist and logged in, create leaderboard
      const doc = await Leaderboard.findOne();
      if (doc instanceof Leaderboard == false && context.user) {
        const newBoard = new Leaderboard({});
        console.log('Leaderboard created:', newBoard);
        console.log('leaderboard id', newBoard._id);

        console.log("data", data);

        // construct highscore object
        let highscore = { user: context.user.username, score: data };
        console.log('highscore object', highscore);

        //apply changes to leaderboard
        const updatedLeaderboard = await Leaderboard.findOneAndUpdate(
          { _id: newBoard._id },
          { $push: { highscores: highscore } },
          { new: true, runValidators: true }
        );

        return updatedLeaderboard;
      }
    },
  },
};

module.exports = resolvers;
