import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Welcome from "../components/Welcome";
import Footer from "../components/Footer";
import { Box, Container, CardActions} from "@mui/material";
import Logo from '../assets/img/logo.svg';
import Auth from "../utils/auth";
import {toggleFullscreen} from "../utils/gameUtils/toggleFullscreen"
import { useHistory } from "react-router-dom";
import GameRules from "../components/GameRules";
const Home = ({gameState, setGameState}) => {
  const [show, setShow] = useState("Welcome");
  const isLoggedIn = (Auth.loggedIn()) ? 1 : 0;
  const navigate = useHistory();

  function handleStartNoLogin() {
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
      loggedIn: isLoggedIn
    }));
    toggleFullscreen();
    navigate.push("/main");
  }

  if (isLoggedIn) {
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
            <img src={Logo} alt="logo"/>
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
        <CardActions
            sx={{
              justifyContent: "center",
              backgroundColor: "transparent",
              mt: 5,
            }}
          >
        <button
              type="button"
              className="nes-btn upperCase"
            
              onClick={handleStartNoLogin}
            >
              Start
            </button>
            <GameRules/>
            
          </CardActions>
      </Container>
     
      <Footer />
    </Box>
)};

export default Home;
