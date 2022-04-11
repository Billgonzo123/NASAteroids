const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Auth {
    token: ID!
    user: User
  }

  input Highscore {
    user: String
    highscore: Int
  }

  type User {
    _id: ID!
    username: String
    email: String
    XP: Int
    highscores: [Int]
    avatar: String
    level: Int
  }

  type Leaderboard {
    highscores: [Int]
  }

  type Query {
    me: User
    leaderboard: Leaderboard
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addUserHighscore(highscores: Highscore): User
    addLeaderboardHighscore(highscores: Highscore!): Leaderboard
  }
`;

module.exports = typeDefs;
