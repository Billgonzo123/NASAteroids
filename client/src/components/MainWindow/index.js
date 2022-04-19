import React, { useState, useEffect, useRef } from "react";

//components
import Hud from '../Hud';
import Player from '../Player';
import Asteroid from '../Asteroid';
import AudioEl from "../AudioEl/AudioEl";
import GameOver from "../GameOver";

//utilities
import motion from '../../util/motion';
import updateAsteroids from '../../util/updateAsteroids';
import updatePlayer from '../../util/updatePlayer';
import updateBullet from '../../util/updateBullet';
import checkShipCollision from '../../util/checkShipCollision';
import checkBulletCollision from '../../util/checkBulletCollision';
import { playSound, playSoundCancel } from '../../util/playSound';
import { checkScreenScale } from '../../util/checkScreenScale';
import asteroidGeneration from '../../util/asteroidGeneration';
import generateBullet from '../../util/generateBullet';

const MainWindow = ({ gameState, setGameState }) => {

  const gameSpeed = 16.667;//16.667ms per frame = ~ 60fps
  const [screenScale, setScreenScale] = useState(window.innerWidth / 1920);
  const [globalPlayer, setGlobalPlayer] = useState({
    x: 906, y: 478, xB: 906, yB: 478, dir: 90, thrust: 0.2, vx: 0, vy: 0,
    turnSpeed: 5, spriteDim: { w: 54, h: 62 }, alive: true, invnsTimer: 0
  });

  const [asteroids, setAsteroids] = useState({});
  const [bullets, setBullets] = useState([]);

  const keysPressed = useRef([]);
  let screenWidth = window.innerWidth;
  const level = useRef(1);
  const numOfAst = useRef();
  const timer = useRef();
  const spaceDown = useRef(0);
  //--------------------------GAME LOOP-------------------------//
  const loop = () => {
    setTimeout(() => {
      //This stays here to trigger the useState below
      //By grouping all the state changes we get better performance
      //but we need to change a state to loop the useEffect
      setGlobalPlayer((oldPlayer) => {
        if (globalPlayer.alive) return updatePlayer(oldPlayer, keysPressed.current)
        return null;
      });
      checkScreenScale(screenWidth, setScreenScale);
      loop();
    }, gameSpeed);
  };

  // ----------FOR GAME LOGIC STUFF THAT REQUIRES STATES---------//
  useEffect(() => {
    level.current = gameState.curLevel;
    if (!gameState.paused) {
      numOfAst.current = document.querySelectorAll('#asteroid-object').length;
      setAsteroids((oldPositions) => updateAsteroids(oldPositions, level.current));
      setBullets((oldPositions) => {
        if (bullets) return updateBullet(oldPositions);
        return null;
      });
      //check for a change in screen size and change scale if change
      
      if (globalPlayer.alive && spaceDown.current === 1 && bullets.length <= 5) {
        spaceDown.current = 2;
        playSoundCancel('bullet_snd');
        setBullets((old) => ([...old, generateBullet(globalPlayer)]));
        setTimeout(() => (spaceDown.current === 2) ? spaceDown.current = 1 : false, 200)
      }
      //asteroidGeneration
      if (numOfAst.current <= 0) {
        let bonus;
        (gameState.timer <= 60) ? bonus = 3000 : bonus = 1000;
        if (gameState.curLevel === 0) bonus = 0;
        setGameState(old => ({ ...old, curLevel: old.curLevel + 1, timer: 0, score: (old.score + bonus) }))
        setAsteroids(asteroidGeneration(asteroids, globalPlayer, 2, gameState.curLevel + 1, 0, 0, 1));
      }
      checkBulletCollision(bullets, setBullets, setAsteroids, asteroids, globalPlayer, setGameState);
      checkShipCollision(globalPlayer, setGlobalPlayer, setGameState, asteroids);
    }
    //DONT PUT ANYMORE INTO DEPENDENCY!! globalPlayer constantly updates!
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalPlayer]);

  //-------------------------Key Input----------------------//
  //keyboard key event handlers. Keeps an array of all currently pressed keys
  const logKeyDown = (e) => {
    e.preventDefault();
    if (!keysPressed.current.includes(e.key)) keysPressed.current = [...keysPressed.current, e.key.toLowerCase()];
    if (keysPressed.current.includes(" ") && spaceDown.current !== 2) spaceDown.current = 1;
  };
  const logKeyUp = (e) => {
    e.preventDefault();
    const newKeys = keysPressed.current.filter((key) => key !== e.key.toLowerCase());
    if (!newKeys.includes(" ")) spaceDown.current = 0;
    if (newKeys !== keysPressed.current) keysPressed.current = newKeys;
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
        {(gameState.lives === 3 && globalPlayer.invnsTimer) ? (<div id='start-display'>!START!</div>) : ("")}
        {/*------------ AUDIO -------------*/}
        <AudioEl />
        {/*------------- HUD  -------------*/}
        <Hud gameState={gameState} setGameState={setGameState} />
        {/*--------- RENDER PLAYER ---------*/}
        {globalPlayer.alive ? (
          <Player globalPlayer={globalPlayer} />
        ) : (
          <GameOver gameState={gameState} setGameState={setGameState} />
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
          ) : ("");
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