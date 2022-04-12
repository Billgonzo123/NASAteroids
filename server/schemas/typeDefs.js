const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Auth {
    token: ID!
    user: User
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
    highscores: [highscore]
  }

  input highscoreData {
    user: String,
    score: Int
  }

  type highscore {
    user: String,
    score: Int
  }

  type Query {
    me: User
    leaderboard: Leaderboard
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, highscores: [String]): Auth
    addUserHighscore(highscores: [Int!]): User
    addLeaderboardHighscore(highscores: [highscoreData]): Leaderboard
  }
`;

module.exports = typeDefs;
