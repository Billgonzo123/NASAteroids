import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Welcome from "../components/Welcome";
import Footer from "../components/Footer";
import { Box, Grid } from "@mui/material";
import Auth from "../util/auth";

const Home = () => {
  const [show, setShow] = useState("Welcome");
  const loggedIn = Auth.loggedIn();

  if (loggedIn) {
    return <Redirect to="/start" />;
  }

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
        {show === "Welcome" && <Welcome show={show} setShow={setShow} />}
        {show === "Login" && (
          <Login
            show={show}
            setShow={setShow}
          />
        )}
        {show === "Signup" && (
          <Signup
            show={show}
            setShow={setShow}
          />
        )}
        <Footer />
      </Grid>
    </Box>
  );
};

export default Home;
