import React, { useState } from "react";
import Leaderboard from "../Leaderboard";
import { CardActions } from "@mui/material";
import { playMenuSound } from "../../utils/playSound";

const Welcome = ({ show, setShow }) => {
 
  return (
    <>
      <Leaderboard />
      <CardActions
        sx={{
          justifyContent: "space-between",
          backgroundColor: "transparent",
          mt: 5,
        }}
      >
        <button
          type="button"
          onClick={() => {
            playMenuSound('menu_select');
            setShow("Login")
          }}
          className={`${show === "Login"} nes-btn upperCase`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => {
            playMenuSound('menu_select');
            setShow("Signup");
          }}

          className={`${show === "Signup"} nes-btn upperCase`}
        >
          Signup
        </button>
      </CardActions>
    </>
  );
};

export default Welcome;
