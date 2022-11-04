import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { GET_LEADERBOARD } from "../../utils/queries";

function createData(userName, score) {
  return { userName, score };
}

export default function LeaderboardTable() {
  const { loading, data, error } = useQuery(GET_LEADERBOARD);
  let rows = [];

  if (data) {
    let highscores = data.leaderboard.highscores || [];
    let scores = [...highscores];
    
    scores.sort((a, b) => (a.score > b.score ? -1 : 1));
    highscores = scores.slice(0, 10);

    highscores.forEach((score) => {
      rows.push(createData(score.user, score.score));
      return rows;
    })
  } 
  
  if (!data) {
    return <Box sx={{ textAlign: "center", mt: 10 }}><p>No high scores yet!</p></Box>
  }


  if (error) {
    console.log(error);
    return <p>No high scores yet!</p>
  }

  return (
    <TableContainer>
      <Table
        sx={{ textTransform: "uppercase" }}
        aria-label="simple table"
      >
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i} sx={{ "& td": { border: 0 } }}>
              <TableCell scope="row" align="left" sx={{ p: 0.25, py: 1 }}>
                {row.userName}
              </TableCell>
              <TableCell align="right" sx={{ p: 0.25 }}>
                {row.score}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
