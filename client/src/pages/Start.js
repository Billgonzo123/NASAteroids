import React, { useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import Profile from "../components/Profile";
import Leaderboard from "../components/Leaderboard";
import Footer from "../components/Footer";
import { Box, Container, Grid, CardActions } from "@mui/material";
import Auth from "../utils/auth";
import { playMenuSound } from "../utils/playSound";
import Logo from "../assets/img/logo.svg";
import { toggleFullscreen } from "../utils/gameUtils/toggleFullscreen.js";
import GameRules from "../components/GameRules";

const Start = ({ gameState, setGameState }) => {
  useEffect(() => {
    setGameState((old) => ({
      ...old,
      curLevel: 0,
      score: 0,
      exp: 0,
      lives: 3,
      playerLevel: 0,
      numberOfAsteroids: 0,
      timer: 0,
      paused: 0,
      gameOver: 0,
      loggedIn: 1
    }));

    playMenuSound("menu_select");
  }, []);

  const navigate = useHistory();

  const handleStart = () => {
    // toggleFullscreen();
    navigate.push("/main");
  };
  const handleLogout = () => {
    Auth.logout();
    navigate.push("/");
    playMenuSound("menu_close");
  };

  if (!Auth.loggedIn()) {
    return <Redirect to="/" />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Container component="main" sx={{ mb: 2 }} maxWidth="xxl">
        <div className="logo">
          <img src={Logo} alt="logo" />
        </div>

        <Grid
          container
          columnSpacing={{ md: 1 }}
          direction="row"
          justifyContent="center"
        >
          <Profile setGameState={setGameState} gameState={gameState} />
          <Leaderboard />
        </Grid>
        <Container maxWidth="xs">
          <CardActions
            sx={{
              justifyContent: "space-between",
              backgroundColor: "transparent",
              mt: 5,
            }}
          >
            <button
              type="button"
              className="nes-btn upperCase"
              onClick={handleStart}
            >
              Start
            </button>
            <GameRules/>
            <button
              type="button"
              className="nes-btn upperCase"
              onClick={handleLogout}
            >
              Logout
            </button>
          </CardActions>
        </Container>
      </Container>
      <Footer />
    </Box>
  );
};

export default Start;
