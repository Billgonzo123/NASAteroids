import * as React from 'react';
import { useQuery, useMutation } from "@apollo/client";
import {Table ,TableBody, TableCell, TableContainer, TableRow} from '@mui/material';
import { GET_ME, GET_LEADERBOARD } from "../../util/queries";
import { ADD_USER_HIGHSCORE, ADD_LEADERBOARD_HIGHSCORE } from "../../util/mutations";

function createData(name, score) {
  return { name, score};
}

const rows = [
  createData('score:', 534),
  createData('XP:', 20),
  createData('bonus:', 1),
  createData('total:', 555),
];

export default function GameOverStats() {
  return (
    <TableContainer>
      <Table sx={{ textTransform: 'uppercase' }} aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '& td': { border: 0 } }}
            >
              <TableCell scope="row" align="left" sx={{ p: 0.25 }}>
                {row.name}
              </TableCell>
              <TableCell align="center" sx={{ p: 0.25 }}>{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}