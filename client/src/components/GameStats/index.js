import * as React from 'react';
import { useQuery, useMutation } from '@apollo/client';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableRow,
// } from '@mui/material';
import { GET_ME, GET_LEADERBOARD } from '../../util/queries';
import {
  ADD_USER_HIGHSCORE,
  ADD_LEADERBOARD_HIGHSCORE,
} from '../../util/mutations';

const GameOverStats = ({ gameState }) => {
  //*QUERIES
  //leaderboard data
  const { data: leaderboardData } = useQuery(GET_LEADERBOARD);
  const leaderboardHighscores = leaderboardData.leaderboard.highscores;
  console.log('leaderboardHighscores', leaderboardHighscores);

  //logged in user data
  const { data: userData } = useQuery(GET_ME);
  const userHighscores = userData.me.highscores;
  console.log('userHighscores', userHighscores);

  //current score
  const currentScore = gameState.score;
  console.log(gameState.score);

  //*MUTATIONS
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
  };

  // //*loop through userdata, if current score is higher, add, sort and pop
  // //* if equal to another score, don't add (error handling, seems to run twice)

  //flawed logic
  if (userHighscores.find((score) => score > currentScore)) {
    console.log('Better luck next time.');
  } else {
    console.log('Congrats!');
    handleUserScoreSubmit();
  }

  return (
    <>hello!</>
    // <TableContainer>
    /* <Table sx={{ textTransform: 'uppercase' }} aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} sx={{ '& td': { border: 0 } }}>
              <TableCell scope="row" align="left" sx={{ p: 0.25 }}>
                {row.name}
              </TableCell>
              <TableCell align="center" sx={{ p: 0.25 }}>
                {row.score}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */
    /* </TableContainer> */
  );
};

export default GameOverStats;
