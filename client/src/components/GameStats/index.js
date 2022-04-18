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
  const { data: leaderboardData } = useQuery(GET_LEADERBOARD);
  const { data: userData } = useQuery(GET_ME);

  // const [addUserHighscore, { highscoreData }] = useMutation(ADD_USER_HIGHSCORE);
  // const [addLeaderboardHighscore, { addLeaderboardData }] = useMutation(
  //   ADD_LEADERBOARD_HIGHSCORE
  // );
  console.log('leaderboard data', leaderboardData);
  console.log('userData', userData);
  console.log('gameState', gameState.score);
  //loop through userdata, if current score is higher, add, sort and pop

  return (
    <TableContainer>
      {/* <Table sx={{ textTransform: 'uppercase' }} aria-label="simple table">
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
      </Table> */}
    </TableContainer>
  );
};

export default GameOverStats;
