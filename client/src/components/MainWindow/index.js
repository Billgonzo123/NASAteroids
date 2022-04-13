import React, { useState, useEffect } from 'react';
import motion from '../../util/motion';
import updateAsteroids from '../../util/updateAsteroids';
import updatePlayer from '../../util/updatePlayer';

const MainWindow = () => {

  const [gameSpeed, setGameSpeed] = useState(8);
  ///the LOWER you set gameSpeed, the faster the game runs. 
  ///16.667 is the largest this number should ever be (1000ms/60 ie, 60 frames per second) 
  ///8 is best for a base speed because it updates inputs twice per frame. very responsive
  //we can make each level harder by increasing this slightly if we want
  const [screenScale, setScreenScale] = useState(.75);//useState(window.innerWidth / 1920);
  const [globalPlayer, setGlobalPlayer] = useState({ x: 906, y: 478, xB: 500, yB: 500, dir: 90, thrust: .05, vx: 0, vy: 0, turnSpeed: 2, spriteDim: { w: 54, h: 62 }, alive: true });
  const [asteroids, setAsteroids] = useState({});
  const [bullets, setBullets] = useState({});
  const [gameState, setGameState] = useState({ curLevel: 1, score: 0, exp: 0, playerLevel: 0, numberOfAsteroids: 0 });
  const [timer, setTimer] = useState(0);
  //-------------------------------------------------------------------END STATES---------------------------------------------------------------//

  //----------------------------------------------------------- Cnsturctor Scope Variables------------------------------------------------------//
  // //this will hold the currently pressed keys
  let keysPressed = [];
  //these are variable outside the loop that hold current states for all constructors
  let updatedPlayer = globalPlayer;
  //generate multiple asteroids based on game level
  let screenWidth = window.innerWidth;

  // -------------------------------------------------------Game Loop----------------------------------------------//
  const loop = () => {
    setTimeout(() => {
      //update player 
      updatedPlayer = updatePlayer(updatedPlayer, keysPressed);

      //update asteroids
      setAsteroids(oldOpsitions => {
        return updateAsteroids(oldOpsitions);
      })

      //  console.log(updatedAsteroids)
      //check for a change in screen size and change scale if change
      if (screenWidth !== window.innerWidth) {
        screenWidth = window.innerWidth;
        console.log('Window Width: ', screenWidth)
        console.log("Game scale: ", (window.innerWidth) / 1920)
        setScreenScale((window.innerWidth) / 1920);
      }
      ////update all states at the end
      setGlobalPlayer({ ...updatedPlayer });

      //check how many asteroid-object there are
      const numOfAst = document.querySelectorAll('#asteroid-object').length;
      setGameState({ ...gameState, numberOfAsteroids: numOfAst });

      setTimer(old => old + 1);
      loop()
    }, gameSpeed);
  }

  //-------------------------------------Key Input-----------------------------------//

  //keyboard key event handlers. Keeps an array of all currently pressed keys
  const logKeyDown = (e) => {
    e.preventDefault()
    if (!keysPressed.includes(e.key)) {
      keysPressed = [...keysPressed, e.key];
      console.log('Pressed: ', keysPressed);
    }
  }

  const logKeyUp = (e) => {
    e.preventDefault()
    const newKeys = keysPressed.filter(key => key !== e.key);
    if (newKeys !== keysPressed) keysPressed = newKeys;
    console.log('Released: ', keysPressed);
  }


  //...........................................USE EFFECT------------------------------//
  useEffect(() => {
    setScreenScale((window.innerWidth) / 1920);
    document.addEventListener('keyup', logKeyUp);
    document.addEventListener('keydown', logKeyDown);
    //generate initial asteroids
    for (let i = 1; i <= gameState.curLevel + 3; i++) {
      setAsteroids(old => ({
        ...old, [i]: {
          id: i,
          x: Math.floor(Math.random() * 1920),
          y: Math.floor(Math.random() * 1080),
          xB: 0,
          yB: 0,
          dir: Math.floor(Math.random() * 100) + Math.floor(Math.random() * (i * 40)),
          thrust: .8,
          vx: 0,
          vy: 0,
          turnSpeed: 2,
          spriteDim: { w: 248, h: 248 },
          alive: true
        }
      }))
    }

    loop();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])




  // console.log(asteroids)

  return (
    <div id='game-window'
      className="App"
      style={{ left: (window.innerWidth - (1920)) / 2, "transform": `scale(${screenScale})` }}>
{/*--------- HUD      ---------*/}
      <div className="nes-container with-title is-centered">
        <p className="title">Controls</p>
        <h1>Press W: Up | A:Left | D:Right |</h1>
      </div>
     
{/*--------- RENDER PLAYER ---------*/}
      {globalPlayer.alive ? (
        <img
          id='player-object'
          alt='player-sprite'
          src={require('../../assets/player_sprt.png')}
          style={motion(globalPlayer.x, globalPlayer.y, globalPlayer.dir)}
        ></img>
      ) : (
        ""
      )
      }

{/*--------- RENDER ASTEROIDS ---------*/}
      {Object.keys(asteroids).map(posId => {
        const pos = asteroids[posId];
        return pos.alive ? (
          <img
            key={posId}
            id='asteroid-object'
            alt='asteroid-sprite'
            src={require('../../assets/asteroid_large_sprt.png')}
            style={motion(pos.x, pos.y, pos.dir)}
          ></img>
        ) : (
          ""
        );
      })}

    </div>

  )

}

export default MainWindow;
