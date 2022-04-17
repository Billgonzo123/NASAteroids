import React from 'react';
import MainWindow from '../components/MainWindow';
import Auth from "../util/auth";
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
    <MainWindow
      menuSoundstate={menuSoundstate}
      setMenuSoundState={setMenuSoundState}
      setGameState={setGameState}
      gameState={gameState}
    />
  );
};

export default Main;
