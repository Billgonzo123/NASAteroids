import React, { useState, useEffect, useRef } from 'react';
import motion from '../../util/motion';
import updateAsteroids from '../../util/updateAsteroids';
import updatePlayer from '../../util/updatePlayer';
import { playSound, stopSound, playMenuSound } from '../../util/playSound';
import { checkScreenScale } from '../../util/checkScreenScale';
import asteroidGeneration from '../../util/asteroidGeneration';
import destoryAsteroid from '../../util/destoryAsteroid';
import Hud from "../../components/Hud"
import Player from '../Player';
import Asteroid from '../Asteroid';

const MainWindow = ({ gameState, setGameState, menuSoundstate, setMenuSoundState }) => {
  const [gameSpeed, setGameSpeed] = useState(8);
  const [screenScale, setScreenScale] = useState((window.innerWidth) / (1920));
  const [globalPlayer, setGlobalPlayer] = useState({ x: 906, y: 478, xB: 500, yB: 500, dir: 90, thrust: .05, vx: 0, vy: 0, turnSpeed: 2, spriteDim: { w: 54, h: 62 }, alive: true });
  const [asteroids, setAsteroids] = useState({});
  const [bullets, setBullets] = useState([]);
  const [timer, setTimer] = useState(0);
  const [currentKeys, setCurrentKeys] = useState([]);

  //----------------------------------------------------------- Cnsturctor Scope Variables------------------------------------------------------//
  // //this will hold the currently pressed keys
  let keysPressed = [];
  //generate multiple asteroids based on game level
  let screenWidth = window.innerWidth;

  // -------------------------------------------------------Game Loop----------------------------------------------//
  const loop = () => {
    setTimeout(() => {
      const numOfAst = document.querySelectorAll('#asteroid-object');
      setGameState(old => ({ ...old, numberOfAsteroids: numOfAst.length }))
      setGlobalPlayer(oldPlayer => updatePlayer(oldPlayer, keysPressed));
      setAsteroids(oldOpsitions => updateAsteroids(oldOpsitions));
      //check for a change in screen size and change scale if change
      checkScreenScale(screenWidth, setScreenScale);
      //updates state with current keys. We dont really wnat this state updtaed as fast as the keysPressed variable, so we put it in the loop
      setCurrentKeys(old => [...keysPressed]);
      //----------------------------------This is just an example of how to use playMenuSound function-------------------------------//
      if (keysPressed.includes('m')) playMenuSound('confirmA', setMenuSoundState);
      //timer for timer stuff
      setTimer(old => old + 1);
      loop();
    }, gameSpeed);
  }

  //-------------UseEffect FOR GAME LOGIC STUFF THAT REQUIRES STATES-------------------//
  useEffect(() => {
    //asteroidGeneration( setAsteroids, spriteSizeIndex, howMany, setX, setY, rndPos)
    if (gameState.numberOfAsteroids <= 0) asteroidGeneration(setAsteroids, 2, gameState.curLevel + 3, 0, 0, 1);

    //------------TEST ASTEROID DESTRUCTION ---------------------------------------------------------
      //destoryAsteroid = (id, asteroids , setAsteroids)
    if (currentKeys.includes('x'))  destoryAsteroid('1', asteroids, setAsteroids);
    //-----------------------------------------------------------------------------------------------

    //DONT PUT STATE: asteroids INTO DEPENDENCY!!
  }, [gameState, setGameState, timer, currentKeys])

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

  //...........................................USE EFFECT ON MOUNT------------------------------//
  useEffect(() => {
    document.addEventListener('keyup', logKeyUp);
    document.addEventListener('keydown', logKeyDown);
    loop();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <>
      <div id='game-window'
        className="App"
        style={{ "transform": `scale(${screenScale})` }}>
        {/*------------ AUDIO -------------*/}
        {/* for every sound effect, there must be an audio element with an id of the file name */}
        <audio id='engine_snd' src={require(`../../assets/snd/player_snd/engine_snd.wav`)} loop type='audio/wav' />
        {/*------------- HUD  -------------*/}
        <Hud />
        {/*--------- RENDER PLAYER ---------*/}
        {globalPlayer.alive ? (
          <Player currentKeys={currentKeys} globalPlayer={globalPlayer} />
        ) : (
          ""
        )
        }
        {/*--------- RENDER ASTEROIDS ---------*/}
        {Object.keys(asteroids).map(posId => {
          const pos = asteroids[posId];
          //add an asteroids to game
          return pos.alive ? (
            <Asteroid pos={pos} posId={posId} />
          ) : (
            ""
          );
        })}
      </div>
      <div id='black-bar' style={{ "top": `${(screenScale * 1080)}px` }} />
    </>
  )
}

export default MainWindow;
