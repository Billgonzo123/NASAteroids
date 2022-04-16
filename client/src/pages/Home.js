import React, { useState } from "react";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Welcome from "../components/Welcome";
import Footer from "../components/Footer";
import { Box, Grid } from "@mui/material";

const Home = () => {
  const [show, setShow] = useState("Welcome");

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
      {show === "Welcome" && <Welcome show={show} setShow={setShow}/>}
      {show === "Login" && <Login show={show} setShow={setShow} />}
      {show === "Signup" && <Signup show={show} setShow={setShow} />}
      <Footer />
    </Grid>
    </Box>
  );
};

export default Home;
