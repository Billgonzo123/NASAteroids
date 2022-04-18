import * as React from 'react';
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
  const { data: leaderboardData, error: leaderboardError } = useQuery(GET_LEADERBOARD);
  const leaderboardHighscores = leaderboardData.leaderboard.highscores;
  console.log('leaderboardHighscores', leaderboardHighscores);

  if (leaderboardError) {
    console.log("leaderboard error")
  }

  //logged in user data
  const { data: userData } = useQuery(GET_ME);
  const userHighscores = userData.me.highscores;
  console.log('userHighscores', userHighscores);

  //current score
  const currentScore = gameState.score;
  console.log('currentScore', currentScore);

  // //*MUTATIONS
  //Add user score
  const [addUserHighscore, { error }] = useMutation(ADD_USER_HIGHSCORE);
  //Handle user score submit
  async function handleUserScoreSubmit() {
    try {
      await addUserHighscore({
        variables: { currentScore },
      });
    } catch (err) {
      console.error(err);
    }
  }

  //*loop through userdata, if current score is higher, add, sort and pop
  //* if equal to another score, don't add (error handling, seems to run twice)

  // if not undefined and unique, add to user highscores
  if (
    userHighscores.find((score) => score > currentScore) ||
    userHighscores.indexOf(currentScore) < 0
  ) {
    console.log('Better luck next time.');
  } else {
    console.log('Congrats!');
    console.log('indexof', userHighscores.indexOf(currentScore));
  }

  console.log(gameState);

  return (
    <TableContainer>
      <Table sx={{ textTransform: 'uppercase' }} aria-label="simple table">
        <TableBody>
          {Object.entries(gameState).map(([key, value]) => (
            <TableRow key={key} sx={{ '& td': { border: 0 } }}>
              <TableCell scope="row" align="left" sx={{ p: 0.25 }}>
                {key}
              </TableCell>
              <TableCell align="center" sx={{ p: 0.25 }}>
                {value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GameOverStats;
