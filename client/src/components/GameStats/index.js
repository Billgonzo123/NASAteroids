import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Container, Grid, Typography } from '@mui/material';
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
    console.log('leaderboardData', leaderboardData);
    console.log('userHighscores', userHighscores);

   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
  <Container maxWidth="md">
    <Typography variant="h5" align="center" sx={{mt: 10}}>
      {isHighscore ? (
        <span>Congratulations, new highscore!</span>
      ) : (
        <span>Better luck next time!</span>
      )}
    </Typography>
    <Typography variant="subtitle1" align="center" sx={{mt: 2}}>
      Final Score: {currentScore}
    </Typography>
    <Grid container spacing={4} sx={{ padding: 6, }}>
      <Grid item xs={6} align="center"> 
        Your Highscores:
      </Grid>
      <Grid item xs={6} align="center">
        Leaderboard:
      </Grid>
      <Grid item xs={6} align="center">
        <Grid container spacing={1}>
          {Object.keys(userScoreDisplay).map((index) => {
            const score = userScoreDisplay[index];
            return userScoreDisplay ? (
              <>
                <Grid item xs={12} key={index}>
                  {score.date}....{score.score}
                </Grid>
              </>
            ) : (
              ''
            );
          })}
        </Grid>
      </Grid>
      <Grid item xs={6} align="center">
        <Grid container spacing={1}>
          {leaderboardData.map(({ score, date }) => {
            console.log(leaderboardData);
            return leaderboardData ? (
              <>
                <Grid item xs={12} key={score}>
                  {date}....{score}
                </Grid>
              </>
            ) : (
              ''
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  </Container>
  );
};

export default GameOverStats;
