import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Welcome from "../components/Welcome";
import Footer from "../components/Footer";
import { Box, Container} from "@mui/material";
import Logo from '../assets/img/logo.svg';
import Auth from "../utils/auth";
import {toggleFullscreen} from "../utils/gameUtils/toggleFullscreen"
import { useHistory } from "react-router-dom";

const Home = () => {
  const [show, setShow] = useState("Welcome");
  const loggedIn = Auth.loggedIn();

  const navigate = useHistory();

  function handleStart() {
    toggleFullscreen();
    navigate.push("/main");
  }

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
        <div maxWidth="sm" style={{display: "flex", justifyContent: "center", flexDirection:'row',alignItems:'center'}}>
        <button
              type="button"
              className="nes-btn upperCase"
            
              onClick={handleStart}
              
            >
              Start
            </button>
          </div>
      </Container>
      <Footer />
    </Box>
)};

export default Home;
