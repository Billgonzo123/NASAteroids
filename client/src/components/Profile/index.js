import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';

// import { useQuery } from '@apollo/client';
// import { GET_ME } from '../../util/queries';

const Profile = () => {
  // const { loading, data } = useQuery(GET_ME);
  // console.log('logged in user data', data);

  let user = {
    username: 'username',
    highscores: [100, 200, 300],
    level: 2,
    XP: 1000000,
  };

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
                {user.XP}
              </TableCell>
            </TableRow>
            {/* user scores */}
            <TableRow sx={{ '& td': { border: 0 } }}>
              <TableCell TableCell scope="row" align="left" sx={{ p: 0.25 }}>
                Scores:
              </TableCell>
            </TableRow>
            <TableRow sx={{ '& td': { border: 0 } }}>
              <TableCell scope="row" align="left" sx={{ p: 0.25 }}>
                {user.highscores}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default Profile;
