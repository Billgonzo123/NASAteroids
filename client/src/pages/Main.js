import React from 'react';
import GameWindow from '../components/GameWindow';
import Auth from "../utils/auth";
import { Redirect } from 'react-router-dom';

const Main = ({
  gameState,
  setGameState,
  setMenuSoundState,
  menuSoundstate,
}) => {

  if (!Auth.loggedIn()) {
    return <Redirect to="/" />
  }

  return (
      <GameWindow
        menuSoundstate={menuSoundstate}
        setMenuSoundState={setMenuSoundState}
        setGameState={setGameState}
        gameState={gameState}
      />
  );
};

export default Main;
