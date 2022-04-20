import React from 'react';
import {  Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableRow,} from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../../util/queries';

const Profile = ({gameState, setGameState}) => {
  const { loading, data } = useQuery(GET_ME);
  const user = data?.me || {};
  let highscores = data?.me.highscores || [];

  highscores = highscores.slice(0,5);

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Card sx={{ minWidth: 275, backgroundColor: 'transparent' }}>
      <CardContent>
        <Typography align="center" className="title" gutterBottom>
          {user.username}
        </Typography>
      </CardContent>
      <TableContainer>
        <Table sx={{ textTransform: 'uppercase' }} aria-label="simple table">
          <TableBody>
            {/* user scores */}
            <TableRow sx={{ '& td': { border: 0 } }}>
              <TableCell TableCell scope="row" align="left" sx={{ p: 0.25 }}>
                Scores:
              </TableCell>
            </TableRow>
            {highscores && highscores.map((score, i) => (
            <TableRow key={i} sx={{ '& td': { border: 0 } }}>
              <TableCell scope="row" align="left" sx={{ p: 0.25 }}>
               {score.date}
              </TableCell>
              <TableCell scope="row" align="left" sx={{ m: 0.25 }}>
               {score.score}
              </TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default Profile;
