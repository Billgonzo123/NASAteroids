import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../../util/queries';

const Profile = () => {
  const { loading, data } = useQuery(GET_ME);
  const user = data?.me || {};
  const highscores = data?.me.highscores || [];

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
            {/* avatar input */}
            <TableRow sx={{ '& td': { border: 0 } }}>
              <TableCell scope="row" align="left" sx={{ p: 0.25 }}>
                Avatar:
              </TableCell>
              <TableCell>
                <input
                  type="text"
                  id="dark_field"
                  className="nes-input is-dark"
                  placeholder="Image url for avatar"
                />
              </TableCell>
            </TableRow>
            {/* XP */}
            <TableRow sx={{ '& td': { border: 0 } }}>
              <TableCell TableCell scope="row" align="left" sx={{ p: 0.25 }}>
                XP:
              </TableCell>
              <TableCell scope="row" align="left" sx={{ p: 0.25 }}>
                {user.XP ? user.XP : 0}
              </TableCell>
            </TableRow>
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
