import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { GET_ME, GET_LEADERBOARD } from '../../util/queries';
import {
  ADD_USER_HIGHSCORE,
  ADD_LEADERBOARD_HIGHSCORE,
} from '../../util/mutations';

const GameOverStats = ({ gameState }) => {
  // //*QUERIES
  //leaderboard data
  const { data: leaderboardData } = useQuery(GET_LEADERBOARD);
  const leaderboardHighscores = leaderboardData.leaderboard.highscores;

  //logged in user data
  const { data: userData } = useQuery(GET_ME);
  const userHighscores = userData.me.highscores;

  //current score
  const currentScore = gameState.score;

  // //*MUTATIONS
  //Add user score
  const [addUserHighscore, { error }] = useMutation(ADD_USER_HIGHSCORE);

  //Handle user score submit
  async function handleUserScoreSubmit() {
    try {
      await addUserHighscore({
        variables: { "score": currentScore },
      });
      console.log('added to user highscores', userHighscores);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    
    console.log('userHighscores', userHighscores)

    if (
      userHighscores.find((score) => score > currentScore)
    ) {
      console.log('Better luck next time.');
    } else {
      console.log('Congrats!');
      handleUserScoreSubmit();
      console.log('typeof currentscore', typeof currentScore)
    }
  }, []);

  return (
    <TableContainer>
      <Table sx={{ textTransform: 'uppercase' }} aria-label="simple table">
        <TableBody>
          {/* {Object.entries(gameState).map(([key, value]) => (
            <TableRow key={key} sx={{ '& td': { border: 0 } }}>
              <TableCell scope="row" align="left" sx={{ p: 0.25 }}>
                {key}
              </TableCell>
              <TableCell align="center" sx={{ p: 0.25 }}>
                {value}
              </TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GameOverStats;
