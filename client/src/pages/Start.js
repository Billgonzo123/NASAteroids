import React  from "react";
import Footer from "../components/Footer";
import Leaderboard from "../components/Leaderboard";
import Login from "../components/Login";
import LevelLoadIn from "../components/LevelLoadIn";
import Signup from "../components/Signup";


import { playMenuSound } from "../util/playSound";

import { Box, Grid } from "@mui/material";


const Start = ({menuSoundstate , setMenuSoundState}) => {

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
        <Login />
        {/* <Signup /> */}
        <Footer />
      </Grid>
    </Box>  
  );
};

export default Start;
