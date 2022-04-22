import React from 'react';
import GameWindow from '../components/GameWindow';
import Auth from "../utils/auth";
import { Redirect } from 'react-router-dom';
import { Responsive } from '../components/Responsive';
import MobileMainWindow from '../components/MobileMainWindow';

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
    <>
    {/* <Responsive displayIn={["Laptop"]}> */}
      <GameWindow
        menuSoundstate={menuSoundstate}
        setMenuSoundState={setMenuSoundState}
        setGameState={setGameState}
        gameState={gameState}
      />
    {/* </Responsive>
    <Responsive displayIn={["Mobile"]}>
      <MobileMainWindow />
    </Responsive> */}
    </>
    
  );
};

export default Main;
