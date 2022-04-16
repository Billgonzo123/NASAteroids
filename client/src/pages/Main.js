import React from 'react';
import MainWindow from '../components/MainWindow';

const Main = ({
  gameState,
  setGameState,
  setMenuSoundState,
  menuSoundstate,
}) => {
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
