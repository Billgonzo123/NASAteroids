import React, { useState, useEffect, useRef } from 'react';
import Player from '../Player';
import Asteroid from '../Asteroid';
import updateAsteroids from '../../util/updateAsteroids';
import updatePlayer from '../../util/updatePlayer';

const MainWindow = ({ globalPlayer, setGlobalPlayer, asteroids, setAsteroids, bullets, setBullets, gameState, setGameState, screenScale, setScreenScale, gameSpeed, setGameSpeed }) => {


  // //this will hold the currently pressed keys
  let keysPressed = [];
  //these are variable outside the loop that hold current states for all constructors
  let updatedPlayer = globalPlayer;
  let updatedAsteroids = asteroids;
  //generate multiple asteroids based on game level
  const [startAsteroids, setStartAsteroids] = useState([]);

  let screenWidth = window.innerWidth;

  // -------------------------------------------------------main loop for updating player position----------------------------------------------//
  function loop() {
    //update player 
    updatedPlayer = updatePlayer(updatedPlayer, keysPressed);
    //update asteroids
    updatedAsteroids = updateAsteroids(updatedAsteroids);

    //check for a change in screen size and change scale if change
    if (screenWidth !== window.innerWidth) {
      screenWidth = window.innerWidth;
      console.log('Window Width: ', screenWidth)
      //setScreenScale((screenWidth)/1920);-----currently disabled-----
    }
    ////update all states at the end
    const newEnd = asteroids.end +1; 
    setAsteroids({ ...asteroids, ...updatedAsteroids});
    setGlobalPlayer({ ...updatedPlayer });
    
    //check how many asteroid-object there are
    const numOfAst = document.querySelectorAll('#asteroid-object').length;
    setGameState({...gameState, numberOfAsteroids: numOfAst});

    //loop the code every <gameSpeed>ms
    setTimeout(() => {
      loop()
    }, gameSpeed)
  }



  //-------------------------------------Key Input--------------------------------------------------------------//

  //keyboard key event handlers. Keeps an array of all currently pressed keys
  function logKeyDown(e) {
    e.preventDefault()
    if (!keysPressed.includes(e.key)) {
      keysPressed = [...keysPressed, e.key];
      console.log('Pressed: ', keysPressed);
    }
  }

  function logKeyUp(e) {
    e.preventDefault()
    const newKeys = keysPressed.filter(key => key !== e.key);
    if (newKeys !== keysPressed) keysPressed = newKeys;
    console.log('Released: ', keysPressed);
  }



  //when the component is mounted, we initiate event listeners for keyup and keydown and start the loop--------
  useEffect(() => {
    document.addEventListener('keyup', logKeyUp);
    document.addEventListener('keydown', logKeyDown);
    //generate initial asteroids
    for (let i = 1; i <= gameState.curLevel+2; i++) {
      updatedAsteroids[i] = {id: i}
      setStartAsteroids(oldArray => [...oldArray,(<Asteroid key={i} id={i} className='asteroid-object' asteroids={asteroids} setAsteroids={setAsteroids} />)])
    }

    loop();
  }, [])




  return (
    <div id='main-window'
      className="App"
      style={{ "transform": `scale(${screenScale})` }}>

      <Player
        globalPlayer={globalPlayer}
        setGlobalPlayer={setGlobalPlayer}
      />
    
      {startAsteroids.map( (roid) => (roid))}

    </div>
  )

}

export default MainWindow;