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
  // const { data: leaderboardData } = useQuery(GET_LEADERBOARD);
  // const leaderboardHighscores = leaderboardData.leaderboard.highscores;

  //logged in user data
  const { data: userData } = useQuery(GET_ME);
  const userHighscores = userData.me.highscores;

  //current score
  const currentScore = gameState.score;

  // //*MUTATIONS
  //Add user score
  const [addUserHighscore] = useMutation(ADD_USER_HIGHSCORE);

  //Handle user score submit
  async function handleUserScoreSubmit() {
    try {
      await addUserHighscore({
        variables: { score: currentScore },
      });
      console.log('added to user highscores', userHighscores);
    } catch (err) {
      console.error(err);
    }
  }

  const [notification, setNotification] = useState(
    <span>Nothing here yet!</span>
  );

  useEffect(() => {
    console.log('userHighscores before', userHighscores);
    if (
      userHighscores.find(
        (score) => score >= currentScore || currentScore === 0
      )
    ) {
      console.log('Better luck next time!');
      setNotification(<span>Better luck next time!</span>);
    } else {
      console.log('Congrats!');
      handleUserScoreSubmit();
      console.log('typeof currentscore', typeof currentScore);
      setNotification(<span>Congratulations, new high score!</span>);
    }
  }, []);

  return (
    <TableContainer>
      <Table sx={{ textTransform: 'uppercase' }} aria-label="simple table">
        <TableBody>
          <TableRow key="GameStats" sx={{ '& td': { border: 0 } }}>
            <TableCell scope="row" align="left" sx={{ p: 0.25 }}>
              Final Score:
            </TableCell>
            <TableCell align="center" sx={{ p: 0.25 }}>
              {currentScore} points
            </TableCell>
            <TableCell align="center" sx={{ p: 0.25 }}>
              {notification}
            </TableCell>
            <TableCell align="center" sx={{ p: 0.25 }}>
              <ul>
                {Object.keys(userHighscores).map((score) => {
                  return <li>score</li>;
                })}
              </ul>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GameOverStats;
