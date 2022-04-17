import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      highscores {
        score
      }
      avatar
      level
      XP
    }
  }
`;

export const GET_LEADERBOARD = gql`
  query leaderboard {
    leaderboard {
      highscores {
        score
        user
        date
      }
    }
  }
`;
