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
<<<<<<< HEAD
    </Responsive>
    <Responsive displayIn={["Mobile"]}>
      <MobileMainWindow gameState={gameState} />
    </Responsive>
=======
    </BrowserView>
    <MobileView>
      <MobileMainWindow />
    </MobileView>
>>>>>>> 21d3c86159338249a21cc96b931c12a6dec31eae
    </>
    
  );
};

export default Main;
