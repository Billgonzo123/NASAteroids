const db = require('../config/connection');
const { User, Leaderboard } = require('../models');

const userData = require('./userData.json');
const leaderboard = require('./leaderboardData.json');

db.once('open', async () => {
  // clean database
  await User.deleteMany({});
  await Leaderboard.deleteMany({});
  // await Leaderboard.deleteMany({});

  // bulk create each model
  await User.create(userData);
  await Leaderboard.create(leaderboard);

  console.log('all done!');
  process.exit(0);
});
