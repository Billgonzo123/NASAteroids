import React, { useState, useEffect } from 'react';
import '../App.css';
import MainWindow from './MainWindow';
import Profile from './Profile';

import Button from './Button';


function App() {
  const [gameSpeed, setGameSpeed] = useState(8);
  ///the LOWER you set gameSpeed, the faster the game runs. 
  ///16.667 is the largest this number should ever be (1000ms/60 ie, 60 frames per second) 
  ///8 is best for a base speed because it updates inputs twice per frame
  //we can make each level harder by increasing this slightly
  const [screenScale, setScreenScale] = useState(.75);//useState(window.innerWidth / 1920);
  const [globalPlayer, setGlobalPlayer] = useState({ x: 500, y: 500, xB: 500, yB: 500, dir: 90, thrust: .05, vx: 0, vy: 0, turnSpeed: 2, spriteDim: {w: 54,h: 62}, alive: true});
  const [asteroids, setAsteroids]= useState([]);
  const [bullets, setBullets] = useState([]);
  const [gameState, setGameState]= useState({curLevel: 1, score: 0, exp: 0, playerLevel: 0, numberOfAsteroids: 0 });


  //dont scale for testing


  return (
    <>
      
      <div className="nes-container with-title is-centered">
        <p className="title">Controls</p>
        <h1>Press W: Up | A:Left | D:Right | GameSpeed: {gameSpeed}</h1>
      </div>
      <Button />
    
      <MainWindow 
        globalPlayer={globalPlayer}
        setGlobalPlayer= {setGlobalPlayer}
        asteroids={asteroids}
        setAsteroids={setAsteroids}
        bullets={bullets}
        setBullets={setBullets}
        gameState={gameState}
        setGameState={setGameState}
        screenScale= {screenScale}
        setScreenScale = {setScreenScale}
        gameSpeed = {gameSpeed}
        setGameSpeed = {setGameSpeed}
        />
    
    </>

  );
}

export default App;

