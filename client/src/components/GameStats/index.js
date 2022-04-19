import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from '@mui/material';
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

  //* LEADERBOARD SCORE
  const [addLeaderboardHighscore] = useMutation(ADD_LEADERBOARD_HIGHSCORE);
  const [deleteLeaderboardScore] = useMutation(DELETE_LEADERBOARD_SCORE);

  //leaderboard data
  const { data: leaderboardData } = useQuery(GET_LEADERBOARD);
  const leaderboardHighscores = leaderboardData.leaderboard.highscores.map(
    (highscore) => highscore.score
  );

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
      if (leaderboardHighscores.length >= 10) {
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

  //handle user score submit
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
    const leaderboardCheck = leaderboardHighscores.find(
      (score) => score >= currentScore
    );

    const userScoreCheck = userHighscores.find(
      (score) => score >= currentScore
    );

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
    <Typography
    variant="h5"
    align="center"
    >
    {isHighscore ? (
              <span>Congratulations, new highscore!</span>
            ) : (
              <span>Better luck next time!</span>
            )}
    </Typography>
    <TableContainer sx={{ display: 'absolute' }}>
      <Table sx={{ textTransform: 'uppercase' }} aria-label="simple table">
        <TableBody>
          <TableRow key="GameStats">
            <TableCell align="right" sx={{ p: 0.25 }}>
              Final Score:
            </TableCell>
            <TableCell align="left" sx={{ p: 0.25 }}>
              {currentScore} points
            </TableCell>
            <TableRow>
              <TableCell>Your Highscores:</TableCell>
            </TableRow>
            <TableCell align="center" sx={{ p: 0.25 }}>
              {Object.keys(userScoreDisplay).map((index) => {
                const score = userScoreDisplay[index];
                return userScoreDisplay ? (
                  <TableRow>
                    <TableCell>{score.date}</TableCell>
                    <TableCell>{score.score}</TableCell>
                  </TableRow>
                ) : (
                  ''
                );
              })}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default GameOverStats;
