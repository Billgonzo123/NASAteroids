import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Typography } from '@mui/material';
import { GET_ME, GET_LEADERBOARD } from '../../util/queries';
import {
  ADD_USER_HIGHSCORE,
  ADD_LEADERBOARD_HIGHSCORE,
  DELETE_USER_SCORE,
  DELETE_LEADERBOARD_SCORE,
} from '../../util/mutations';
import Auth from '../../util/auth';

const GameOverStats = ({ gameState }) => {
  //highscore notification state
  const [isHighscore, setisHighscore] = useState(null);

  //logged in user data
  const { data: userData } = useQuery(GET_ME);
  const userHighscores = userData.me.highscores.map(
    (highscore) => highscore.score
  );
  const [userScoreDisplay, setUserScoreDisplay] = useState(
    userData.me.highscores
  );

  //current score
  const currentScore = gameState.score;

  // //* LEADERBOARD SCORE
  // const [addLeaderboardHighscore] = useMutation(ADD_LEADERBOARD_HIGHSCORE);
  // const [deleteLeaderboardScore] = useMutation(DELETE_LEADERBOARD_SCORE);

  //leaderboard data
  const { data: leaderboardData, error: error } = useQuery(GET_LEADERBOARD);
  const leaderboardHighscores = leaderboardData.leaderboard.highscores.map(
    (highscore) => highscore.score
  );

  // //handle delete lowest leaderboard score
  // async function handleDeleteLeaderBoardScore() {
  //   const token = Auth.loggedIn() ? Auth.getToken() : null;
  //   if (!token) {
  //     return false;
  //   }
  //   try {
  //     deleteLeaderboardScore();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // //add score to leaderboard
  // async function handleLeaderBoardSubmit() {
  //   try {
  //     await addLeaderboardHighscore({
  //       variables: { score: currentScore },
  //     });
  //     // do we have more than 10 leaderboard highscores?
  //     if (leaderboardHighscores.length >= 10) {
  //       handleDeleteLeaderBoardScore();
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  //* USER SCORE
  const [addUserHighscore] = useMutation(ADD_USER_HIGHSCORE);
  const [deleteUserScore] = useMutation(DELETE_USER_SCORE);

  //handle delete user's lowest score
  async function handleDeleteUserScore() {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      deleteUserScore();
    } catch (err) {
      console.log(err);
    }
  }

  // handle user score submit
  async function handleUserScoreSubmit() {
    //add userhighscore
    try {
      await addUserHighscore({
        variables: { score: currentScore },
      });
      // do we have more than 5 user highscores?
      if (userHighscores.length >= 4) {
        handleDeleteUserScore();
      }
      setUserScoreDisplay(userData.me.highscores);
    } catch (err) {
      console.error(err);
    }
  }

  //is user's current score higher than previous and 0?
  useEffect(() => {
    // const leaderboardCheck = leaderboardHighscores.find(
    //   (score) => score >= currentScore
    // );

    const userScoreCheck = userHighscores.find(
      (score) => score >= currentScore
    );

    if (userScoreCheck || currentScore === 0) {
      setisHighscore(false);
      // } else if (leaderboardCheck) {
      //   handleLeaderBoardSubmit();
      //   setisHighscore(true);
    } else {
      handleUserScoreSubmit();
      setisHighscore(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Typography variant="h5" align="center">
        {isHighscore ? (
          <span>Congratulations, new highscore!</span>
        ) : (
          <span>Better luck next time!</span>
        )}
      </Typography>
      <table id="gameover-stats">
        <thead>
          <tr>
            <th> Final Score: {currentScore}</th>
          </tr>
          <tr>
            <th>Your Highscores:</th>
            {Object.keys(userScoreDisplay).map((index) => {
              const score = userScoreDisplay[index];
              return userScoreDisplay ? (
                <tr>
                  <td>{score.date}</td>
                  <td>{score.score}</td>
                </tr>
              ) : (
                ''
              );
            })}
          </tr>
        </thead>
      </table>
    </>
  );
};

export default GameOverStats;
