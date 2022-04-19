import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Welcome from "../components/Welcome";
import Footer from "../components/Footer";
import { Box, Container} from "@mui/material";
import Auth from "../util/auth";

const Home = () => {
  const [show, setShow] = useState("Welcome");
  const loggedIn = Auth.loggedIn();

  if (loggedIn) {
    return <Redirect to="/start" />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Container component="main" sx={{mb: 2 }} maxWidth="xxl">
        <div className="logo">
            <h1>ASTEROIDS</h1>
        </div>
        <Container maxWidth="sm">
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
        </Container> 
      </Container>
      <Footer />
    </Box>
)};

export default Home;
