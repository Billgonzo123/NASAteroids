import React, { useState, useEffect, useRef } from 'react';

//utilities
import motion from '../../util/motion';
import updateAsteroids from '../../util/updateAsteroids';
import updatePlayer from '../../util/updatePlayer';
import updateBullet from '../../util/updateBullet';
import checkShipCollision from '../../util/checkShipCollision';
import checkBulletCollision from '../../util/checkBulletCollision';
import { playSound, stopSound, playMenuSound } from '../../util/playSound';
import { checkScreenScale } from '../../util/checkScreenScale';
import asteroidGeneration from '../../util/asteroidGeneration';
import generateBullet from '../../util/generateBullet';
import Hud from '../../components/Hud';
import Player from '../Player';
import Asteroid from '../Asteroid';

const MainWindow = ({ gameState, setGameState, menuSoundstate, setMenuSoundState }) => {
  const [gameSpeed, setGameSpeed] = useState(8);
  const [screenScale, setScreenScale] = useState(window.innerWidth / 1920);
  const [globalPlayer, setGlobalPlayer] = useState({
    x: 906, y: 478, xB: 906, yB: 478, dir: 90, thrust: 0.05, vx: 0, vy: 0,
    turnSpeed: 4, spriteDim: { w: 54, h: 62 }, alive: true, invnsTimer: 800
  });

  const [asteroids, setAsteroids] = useState({});
  const [bullets, setBullets] = useState([]);
  const [currentKeys, setCurrentKeys] = useState([]);

  let keysPressed = [];
  let screenWidth = window.innerWidth;
  let setNewAsteroidsFlag = useRef(1);
  //*GAME LOOP
  const loop = () => {
    setTimeout(() => {
      const numOfAst = document.querySelectorAll('#asteroid-object');
      //Checks if all asteroids are dead. if so, current level + 1
      setGameState((old) => ({ ...old, numberOfAsteroids: numOfAst.length }));
      setGlobalPlayer((oldPlayer) => updatePlayer(oldPlayer, keysPressed));
      setAsteroids((oldPositions) => updateAsteroids(oldPositions));
      setBullets((oldPositions) => updateBullet(oldPositions));
      //check for a change in screen size and change scale if change
      checkScreenScale(screenWidth, setScreenScale);
      //updates state with current keys. We dont really want this state updated as fast as the keysPressed variable, so we put it in the loop
      setCurrentKeys((old) => [...keysPressed]);
      loop();
    }, gameSpeed);
  };

  // ----------FOR GAME LOGIC STUFF THAT REQUIRES STATES---------//
  useEffect(() => {
   
    if (currentKeys.includes(' ') && document.getElementById('bullet_snd').paused) {
      playSound('bullet_snd');
      generateBullet(globalPlayer, setBullets);
    }

    //asteroidGeneration( setAsteroids, globalPlayer, spriteSizeIndex, howMany, setX, setY, rndPos)
    if (gameState.numberOfAsteroids <= 0 && setNewAsteroidsFlag.current) {
      // console.log(gameState.curLevel)
      setNewAsteroidsFlag.current = 0;
      (gameState.timer <= 60) ? setGameState(old => ({ ...old, curLevel: old.curLevel + 1, score: (old.score + 3000) })) : setGameState(old => ({ ...old, curLevel: old.curLevel + 1, score: (old.score + 1000) }));
      asteroidGeneration(setAsteroids, globalPlayer, 2, gameState.curLevel , 0, 0, 1);
      setTimeout(() => setNewAsteroidsFlag.current = 1, 5000);
    }

    checkBulletCollision(bullets, setBullets, setAsteroids, asteroids, globalPlayer, setGameState);
    checkShipCollision(globalPlayer, setGlobalPlayer, setGameState, asteroids);
    //DONT PUT STATE: asteroids INTO DEPENDENCY!!
  }, [gameState, setGameState, currentKeys]);

  //-------------------------Key Input----------------------//
  //keyboard key event handlers. Keeps an array of all currently pressed keys
  const logKeyDown = (e) => {
    e.preventDefault();
    if (!keysPressed.includes(e.key)) keysPressed = [...keysPressed, e.key];
  };
  const logKeyUp = (e) => {
    e.preventDefault();
    const newKeys = keysPressed.filter((key) => key !== e.key);
    if (newKeys !== keysPressed) keysPressed = newKeys;
  };

  //......................USE EFFECT ON MOUNT----------------//
  useEffect(() => {
    playSound('start_snd')
    document.addEventListener('keyup', logKeyUp);
    document.addEventListener('keydown', logKeyDown);
    loop();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //-----------------------------JSX-----------------------//
  return (
    <>
      <div
        id="game-window"
        className="App"
        style={{ "transform": `scale(${screenScale})` }}>
        {gameState.lives === 3 && globalPlayer.invnsTimer && <div id='start-display'>!START!</div>}
        {/*------------ AUDIO -------------*/}
        {/* for every sound effect, there must be an audio element with an id of the file name */}
        <audio id="engine_snd" src={require(`../../assets/snd/player_snd/engine_snd.wav`)} loop type="audio/wav" />
        <audio id="bullet_snd" src={require(`../../assets/snd/bullet_snd/bullet_snd.wav`)} type="audio/wav" />
        <audio id="asteroid_die" src={require(`../../assets/snd/bullet_snd/asteroid_die.wav`)} type="audio/wav" />
        <audio id="player_die" src={require(`../../assets/snd/player_snd/player_die.wav`)} type="audio/wav" />
        <audio id="start_snd" src={require(`../../assets/snd/player_snd/start_snd.wav`)} type="audio/wav" />
        <audio id="gameover" src={require(`../../assets/snd/player_snd/gameover.wav`)} type="audio/wav" />
        {/*------------- HUD  -------------*/}
        <Hud gameState={gameState} />
        {/*--------- RENDER PLAYER ---------*/}
        {globalPlayer.alive ? (
          <Player currentKeys={currentKeys} globalPlayer={globalPlayer} />
        ) : (
          <div id='game-over' >GAME OVER</div>
        )}
        {/*--------- RENDER BULLETS ---------*/}
        {bullets.map((pos) => {
          return pos ? (
            <img
              id='bullet-object'
              alt="bullet-sprite"
              src={require('../../assets/img/bullet.png')}
              style={motion(pos.x, pos.y, pos.dir)}
            />
          ) : (
            ''
          );
        })}
        {/*--------- RENDER ASTEROIDS ---------*/}
        {Object.keys(asteroids).map((posId) => {
          const pos = asteroids[posId];
          return pos.alive ? <Asteroid pos={pos} posId={posId} /> : '';
        })}
      </div>
      <div id="black-bar" style={{ top: `${screenScale * 1080}px` }} />
    </>
  );
};
export default MainWindow;