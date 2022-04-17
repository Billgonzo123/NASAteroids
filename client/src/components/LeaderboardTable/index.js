import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { GET_LEADERBOARD } from "../../util/queries";

function createData(userName, score) {
  return { userName, score };
}

export default function LeaderboardTable() {
  const { loading, data, error } = useQuery(GET_LEADERBOARD);
  let rows = [];
  
  if (data) {
    const highscores = data.leaderboard.highscores;
    
    highscores.forEach((score) => {
      rows.push(createData(score.user, score.score));
      return rows;
    })
  }
  if (error) {
    console.log(error);
  }

  return (
    <TableContainer>
      <Table
        sx={{ minWidth: 275, textTransform: "uppercase" }}
        aria-label="simple table"
      >
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i} sx={{ "& td": { border: 0 } }}>
              <TableCell scope="row" align="left" sx={{ p: 0.25, py: 1 }}>
                {row.userName}
              </TableCell>
              <TableCell align="center" sx={{ p: 0.25 }}>
                {row.score}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
