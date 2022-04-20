import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Grid, Typography } from '@mui/material';
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

  //current score
  const currentScore = gameState.score;

  //logged in user data
  const { data: userData } = useQuery(GET_ME);
  const userHighscores = userData.me.highscores.map(
    (highscore) => highscore.score
  );
  const [userScoreDisplay, setUserScoreDisplay] = useState(
    userData.me.highscores
  );

  // //* LEADERBOARD SCORE
  const [addLeaderboardHighscore] = useMutation(ADD_LEADERBOARD_HIGHSCORE);
  const [deleteLeaderboardScore] = useMutation(DELETE_LEADERBOARD_SCORE);

  //leaderboard user data
  const { data } = useQuery(GET_LEADERBOARD);
  const leaderboardData = data?.leaderboard.highscores || [];

  //handle delete lowest leaderboard score
  async function handleDeleteLeaderBoardScore() {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      deleteLeaderboardScore();
    } catch (err) {
      console.log(err);
    }
  }

  //add score to leaderboard
  async function handleLeaderBoardSubmit() {
    try {
      await addLeaderboardHighscore({
        variables: { score: currentScore },
      });
      // do we have more than 10 leaderboard highscores?
      if (leaderboardData.length >= 10) {
        handleDeleteLeaderBoardScore();
      }
    } catch (err) {
      console.error(err);
    }
  }

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
    const leaderboardCheck = leaderboardData.find(
      (score) => score >= currentScore
    );
    console.log(leaderboardCheck);
    const userScoreCheck = userHighscores.find(
      (score) => score >= currentScore
    );

    console.log(userScoreCheck);
    if (userScoreCheck || currentScore === 0) {
      setisHighscore(false);
    } else if (leaderboardCheck) {
      handleLeaderBoardSubmit();
      setisHighscore(true);
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

      <Grid container spacing={2}>
        <Grid item xs={2}>
          <span> Final Score: {currentScore}</span>
        </Grid>
        <Grid item xs={2}>
          <span>Your Highscores:</span>
        </Grid>
        <Grid item xs={2}>
          {Object.keys(userScoreDisplay).map((index) => {
            const score = userScoreDisplay[index];
            return userScoreDisplay ? (
              <>
                <Grid item xs={1}>
                  {score.date}
                </Grid>
                <Grid item xs={1}>
                  {score.score}
                </Grid>
              </>
            ) : (
              ''
            );
          })}
        </Grid>
        <Grid item xs={2}>
          <span>Leaderboard:</span>
        </Grid>
        <Grid container spacing={2}>
          {leaderboardData.map(({ score, date }) => {
            console.log(leaderboardData);
            return leaderboardData ? (
              <>
                <Grid item xs={2} key={score}>
                  {score}
                </Grid>
                <Grid item xs={2} key={date}>
                  {date}
                </Grid>
              </>
            ) : (
              ''
            );
          })}
        </Grid>
      </Grid>
    </>
  );
};

export default GameOverStats;
