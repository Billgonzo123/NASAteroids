import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { GET_ME, GET_LEADERBOARD } from '../../util/queries';
import {
  ADD_USER_HIGHSCORE,
  ADD_LEADERBOARD_HIGHSCORE,
  DELETE_USER_SCORE,
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

  // //* LEADERBOARD
  // const [addLeaderboardHighscore] = useMutation(ADD_LEADERBOARD_HIGHSCORE);
  // //need to code
  // // const [deleteLeaderboardScore] = useMutation(DELETE_LEADERBOARD_SCORE);

  // //leaderboard data
  // const { data: leaderboardData } = useQuery(GET_LEADERBOARD);
  // const leaderboardHighscores = leaderboardData.leaderboard.highscores.map(
  //   (highscore) => highscore.score
  // );

  // //handle Delete
  // async function handleDeleteLeaderBoardScore() {
  //   const token = Auth.loggedIn() ? Auth.getToken() : null;
  //   if (!token) {
  //     return false;
  //   }
  //   try {
  //     // deleteLeaderBoardScore();
  //     console.log("delete leaderboard score needs to go here!")
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

  //Handle delete user's lowest score
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

  //Handle user score submit
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

  // is user's current score higher than previous and 0?
  useEffect(() => {
    // const leaderboardCheck = leaderboardHighscores.find(
    //   (score) => score >= currentScore
    // );

    const userScoreCheck = userHighscores.find(
      (score) => score >= currentScore
    );

    if (userScoreCheck || currentScore === 0) {
      setisHighscore(false);
      // }
      // else if (leaderboardCheck) {
      //   handleLeaderBoardSubmit();
    } else {
      handleUserScoreSubmit();
      setisHighscore(true);
    }
  }, []);

  return (
    <TableContainer>
      <Table sx={{ textTransform: 'uppercase' }} aria-label="simple table">
        <TableBody>
          <TableRow align="center">
            {isHighscore ? (
              <span>Congratulations, new highscore!</span>
            ) : (
              <span>Better luck next time!</span>
            )}
          </TableRow>
          <TableRow key="GameStats">
            <TableCell scope="right" align="left" sx={{ p: 0.25 }}>
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
  );
};

export default GameOverStats;
