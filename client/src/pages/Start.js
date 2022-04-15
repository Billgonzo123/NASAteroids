import React from "react";
import Footer from "../components/Footer";
import Leaderboard from "../components/Leaderboard";
import 
import { Card, CardActions, Box, Grid } from "@mui/material";
import { playMenuSound } from "../util/playSound";

const Start = ({ menuSoundstate, setMenuSoundState }) => {
  return (
    <Box>
      <Grid
        container
        columnSpacing={{ md: 1 }}
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <div className="logo">
          <h1>ASTEROIDS</h1>
        </div>
        <Leaderboard />
        <CardActions
            sx={{
              justifyContent: "space-between",
              backgroundColor: "transparent",
              mt: 10,
            }}
          >
            <button type="button" className="nes-btn upperCase">
              Login
            </button>
            <button type="button" className="nes-btn upperCase">
              Signup
            </button>
          </CardActions>
        <Footer />
      </Grid>
    </Box>
  );
};

export default Start;
