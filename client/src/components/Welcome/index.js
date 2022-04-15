import React, { useState } from "react";
import Leaderboard from "../Leaderboard";
import { Card, CardActions, Box, Grid } from "@mui/material";
import { playMenuSound } from "../../util/playSound";

const Welcome = ({ menuSoundstate, setMenuSoundState, props }) => {
  const {
    elements = [],
    show,
    setShow,
  } = props;

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
              gap: 20
            }}
          >
            <button 
              type="button" 
              onClick={() => setShow(elements[1])}
              className={`${show === "Login"} nes-btn upperCase`}
              >
              Login
            </button>
            <button 
              type="button" 
              onClick={() => setShow(elements[2])}
              className={`${show === "Signup"} nes-btn upperCase`}
              >
              Signup
            </button>
          </CardActions>
      </Grid>
    </Box>
  );
};

export default Welcome;