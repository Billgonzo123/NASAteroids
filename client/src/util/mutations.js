import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER_HIGHSCORE = gql`
  mutation AddUserHighscore($highscores: [Int!]) {
    addUserHighscore(highscores: $highscores) {
      _id
      username
      email
      XP
      highscores
      avatar
      level
    }
  }
`;

export const ADD_LEADERBOARD_HIGHSCORE = gql`
  mutation AddLeaderboardHighscore($score: Int) {
    addLeaderboardHighscore(score: $score) {
      highscores {
        user
        score
      }
    }
  }
`;

export const ADD_USER_XP = gql`
  mutation addXP($xp: Int!) {
    addUserXP(XP: $xp) {
      _id
      username
      email
      highscores
      avatar
      level
      XP
    }
  }
`;
