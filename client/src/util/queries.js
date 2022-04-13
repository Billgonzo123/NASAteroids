import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      highscores
      avatar
      level
    }
  }
`;

export const GET_LEADERBOARD = gql`
  query leaderboard {
    leaderboard {
      highscores
    }
  }
`;