const { AuthenticationError } = require('apollo-server-express');
const { User, Leaderboard, Highscore } = require('../models');
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
    addUserHighscore: async (parent, args, context) => {
      if (context.user) {
        let highscore = await Highscore.create({ ...args, user: context.user.username, score: args.score })
        
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { highscores: highscore } },
          { new: true }
        );
        console.log('highscore', highscore)
        return user;
      }
      throw new AuthenticationError('Must be logged in');
    },
    addLeaderboardHighscore: async (parent, { score }, context) => {
      //query all leaderboards
      const all = await Leaderboard.findOne();

      // construct highscore object
      let highscore = { user: context.user.username, score: score };
      console.log('highscore object', highscore);

      // If a leaderboard doesn't already exist and logged in, create leaderboard
      if (all instanceof Leaderboard == false && context.user) {
        //create new board with highscore object info
        const newBoard = Leaderboard.create(highscore);
        return newBoard;
      }
      //else update existing board
      else if (context.user) {
        const updatedLeaderboard = await Leaderboard.findOneAndUpdate(
          { _id: all._id },
          { $push: { highscores: highscore } }
        );
        return updatedLeaderboard;
      }
    },
    addUserXP: async (parent, { XP }, context) => {
      if (context.user) {
        console.log('user', context.user);
        console.log('XP', XP);

        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $inc: {XP: XP} },
          { new: true, runValidators: true }
        );
        return user;
      }
    },
  },
};

module.exports = resolvers;
