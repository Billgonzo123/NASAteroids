import React, { useState, useEffect, useRef } from "react";

//utilities
import motion from '../../util/motion';
import updateAsteroids from '../../util/updateAsteroids';
import updatePlayer from '../../util/updatePlayer';
import updateBullet from '../../util/updateBullet';
import checkShipCollision from '../../util/checkShipCollision';
import checkBulletCollision from '../../util/checkBulletCollision';
import { playSound } from '../../util/playSound';
import { checkScreenScale } from '../../util/checkScreenScale';
import asteroidGeneration from '../../util/asteroidGeneration';
import generateBullet from '../../util/generateBullet';
import Hud from '../../components/Hud';
import AudioEl from "../AudioEl/AudioEl";
import Player from '../Player';
import Asteroid from '../Asteroid';

const MainWindow = ({ gameState, setGameState }) => {
  const gameSpeed = 16.667;//16.667ms per frame = ~ 60fps
  const [screenScale, setScreenScale] = useState(window.innerWidth / 1920);
  const [globalPlayer, setGlobalPlayer] = useState({
    x: 906, y: 478, xB: 906, yB: 478, dir: 90, thrust: 0.2, vx: 0, vy: 0,
    turnSpeed: 5, spriteDim: { w: 54, h: 62 }, alive: true, invnsTimer: 300
  });

  const [asteroids, setAsteroids] = useState({});
  const [bullets, setBullets] = useState([]);
  const [currentKeys, setCurrentKeys] = useState([]);

  let keysPressed = [];
  let screenWidth = window.innerWidth;
  const level = useRef(1);
  const setNewAsteroidsFlag = useRef(1);
  const numOfAst = useRef();
  const timer = useRef();
  //--------------------------GAME LOOP-------------------------//
  const loop = () => {
    setTimeout(() => {
     if (!gameState.paused){
      numOfAst.current =  document.querySelectorAll('#asteroid-object').length;
      setGlobalPlayer((oldPlayer) => updatePlayer(oldPlayer, keysPressed));
      setAsteroids((oldPositions) => updateAsteroids(oldPositions, level.current));
      setBullets((oldPositions) => updateBullet(oldPositions));
      //check for a change in screen size and change scale if change
      checkScreenScale(screenWidth, setScreenScale);
      //updates state with current keys. We dont really want this state updated as fast as the keysPressed variable, so we put it in the loop
      setCurrentKeys((old) => {
        if (old !== [...keysPressed]) {
          return [...keysPressed];
        }
        return null;
      });
    }
      loop();
    }, gameSpeed);
  };

  // ----------FOR GAME LOGIC STUFF THAT REQUIRES STATES---------//
  useEffect(() => {
    level.current = gameState.curLevel;
    if (currentKeys.includes(' ') && document.getElementById('bullet_snd').paused) {
      playSound('bullet_snd');
      setBullets((old) => ([...old, generateBullet(globalPlayer)]));;
    }
    //asteroidGeneration
    if (numOfAst.current <= 0 && setNewAsteroidsFlag.current) {
      setNewAsteroidsFlag.current = 0;
      (gameState.timer <= 60) ? setGameState(old => ({ ...old, curLevel: old.curLevel + 1, timer: 0, score: (old.score + 3000) })) : setGameState(old => ({ ...old, curLevel: old.curLevel + 1, timer: 0, score: (old.score + 1000) }));
      setAsteroids(old => asteroidGeneration(asteroids, globalPlayer, 2, gameState.curLevel + 1, 0, 0, 1));
      setTimeout(() => setNewAsteroidsFlag.current = 1, 500);
    }
    checkBulletCollision(bullets, setBullets, setAsteroids, asteroids, globalPlayer, setGameState);
    checkShipCollision(globalPlayer, setGlobalPlayer, setGameState, asteroids);
    //DONT PUT ANYMORE INTO DEPENDENCY!! globalPlayer constantly updates!
     //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalPlayer]);

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
  
  //...........................................USE EFFECT ON MOUNT------------------------------//
  useEffect(() => {
    playSound("start_snd");
    document.addEventListener("keyup", logKeyUp);
    document.addEventListener("keydown", logKeyDown);
    loop();
    // Start Game Timer
    timer.current = setInterval(() => {
      setGameState((old) => ({ ...old, timer: old.timer + 1 }));
    }, 1000);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Stop Timer when Player Dies
  useEffect(() => {
    return () => {
      clearInterval(timer.current);
    };
  }, [globalPlayer.alive]);

  return (
    <>
      <div
        id="game-window"
        className="App"
        style={{ "transform": `scale(${screenScale})` }}>
        {gameState.lives === 3 && globalPlayer.invnsTimer && <div id='start-display'>!START!</div>}
        {/*------------ AUDIO -------------*/}
       
           <AudioEl/>
        {/*------------- HUD  -------------*/}
        <Hud gameState={gameState} setGameState={setGameState} />
        {/*--------- RENDER PLAYER ---------*/}
        {globalPlayer.alive ? (
          <Player currentKeys={currentKeys} globalPlayer={globalPlayer} />
        ) : (
          <div id="game-over">GAME OVER</div>
        )}
        {/*--------- RENDER BULLETS ---------*/}
        {bullets.map((pos) => {
          return pos ? (
            <img
              id='bullet-object'
              alt="bullet-sprite"
              src={require("../../assets/img/bullet.png")}
              style={motion(pos.x, pos.y, pos.dir)}
            />
          ) : ( "" );
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