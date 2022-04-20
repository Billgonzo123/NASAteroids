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
        email
        highscores {
          score
          user
          date
        }
      }
    }
  }
`;

export const ADD_USER_HIGHSCORE = gql`
  mutation addUserHighscore($score: Int!) {
    addUserHighscore(score: $score) {
      _id
      highscores {
        score
        user
        date
      }
    }
  }
`;

export const ADD_LEADERBOARD_HIGHSCORE = gql`
  mutation AddLeaderboardHighscore($score: Int!) {
    addLeaderboardHighscore(score: $score) {
      highscores {
        score
        user
        date
      }
    }
  }
`;

export const DELETE_USER_SCORE = gql`
  mutation deleteUserScore($score: Int) {
    deleteUserScore(score: $score) {
      _id
      username
      email
      highscores {
        score
        user
        date
      }
    }
  }
`;

export const DELETE_LEADERBOARD_SCORE = gql`
  mutation deleteLeaderboardHighscore($score: Int) {
    deleteLeaderboardHighscore(score: $score) {
      highscores {
        score
        user
        date
      }
    }
  }
`;
