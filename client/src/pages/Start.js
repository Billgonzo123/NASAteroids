import React from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import Profile from '../components/Profile';
import Leaderboard from '../components/Leaderboard';
import Footer from '../components/Footer';
import { Box, Container, Grid, CardActions } from '@mui/material';
import Auth from "../util/auth";

const Start = ({gameState, setGameState}) => {

  const navigate = useHistory();

  const handleStart = () => {
    navigate.push("/main");
  }
  const handleLogout = () => {
    Auth.logout();
    navigate.push("/");
  }

  if (!Auth.loggedIn()) {
    return <Redirect to="/" />
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Container component="main" sx={{mb: 2 }} maxWidth="lg">
        <div className="logo">
            <h1>ASTEROIDS</h1>
        </div>
        <Grid
          container
          columnSpacing={{ md: 1 }}
          direction="row"
          justifyContent="center"
        >
          <Profile 
            setGameState={setGameState}
            gameState={gameState}
          />
          <Leaderboard />
        </Grid>
        <Container maxWidth="xs">
          <CardActions
            sx={{
              justifyContent: "space-between",
              backgroundColor: "transparent",
              mt: 10,
            }}
          >
            <button 
              type="button" 
              className="nes-btn upperCase"
              onClick={handleStart}
              >
              Start
            </button>
            <button 
              type="button" 
              className="nes-btn upperCase"
              onClick={handleLogout}>
              Logout
            </button>
          </CardActions>
        </Container>
      </Container>
      <Footer />
    </Box>
)};

export default Start;