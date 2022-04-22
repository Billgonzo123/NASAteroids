import React from 'react';
import GameWindow from '../components/GameWindow';
import Auth from "../utils/auth";
import { Redirect } from 'react-router-dom';
// import { Responsive } from '../components/Responsive';
import { BrowserView, MobileView } from 'react-device-detect';
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
    <BrowserView>
      <GameWindow
        menuSoundstate={menuSoundstate}
        setMenuSoundState={setMenuSoundState}
        setGameState={setGameState}
        gameState={gameState}
      />
    </BrowserView>
    <MobileView>
      <MobileMainWindow />
    </MobileView>
    </>
    
  );
};

export default Main;
