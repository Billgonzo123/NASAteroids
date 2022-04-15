import React from "react";
import Footer from "../components/Footer";
import Leaderboard from "../components/Leaderboard";
import Hud from "../components/Hud";
import LevelLoadIn from "../components/LevelLoadIn";
import Signup from "../components/Signup";

import { Button, Box, Grid } from "@mui/material";

const Start = () => {
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
        <Hud />
        {/* <Signup /> */}
        <Footer />
      </Grid>
    </Box>  
  );
};

export default Start;
