import React, { useState, useEffect, useRef } from "react";

//components
import Hud from '../Hud';
import Player from '../Player';
import Asteroid from '../Asteroid';
import AudioEl from "../AudioEl/AudioEl";
import GameOver from "../GameOver";
import Touch from "../Touch";

//utilities
import motion from '../../utils/gameUtils/motion';
import updateAsteroids from '../../utils/updateObjects/updateAsteroids';
import updatePlayer from '../../utils/updateObjects/updatePlayer';
import updateBullet from '../../utils/updateObjects/updateBullet';
import updateUfo from '../../utils/updateObjects/updateUfo'
import checkShipCollision from '../../utils/collisions/checkShipCollision';
import checkBulletCollision from '../../utils/collisions/checkBulletCollision';
import asteroidGeneration from '../../utils/createObjects/asteroidGeneration';
import generateBullet from '../../utils/createObjects/generateBullet';
import { playSound, playSoundCancel } from '../../utils/playSound';
import { checkScreenScale } from '../../utils/gameUtils/checkScreenScale';

const GameWindow = ({ gameState, setGameState }) => {
  //------------------------------States---------------------------//
  const gameSpeed = 16.667;//16.667ms per frame = ~ 60fps
  const [ufo, setUfo] = useState({ x: -200, y: 50, bullet: { x: -1000, y: -1000 } });
  const [screenScale, setScreenScale] = useState(window.innerWidth / 1920);
  const [globalPlayer, setGlobalPlayer] = useState({
    x: 906, y: 478, xB: 906, yB: 478, dir: 90, thrust: 0.2, vx: 0, vy: 0,
    turnSpeed: 5, spriteDim: { w: 54, h: 62 }, alive: true, invnsTimer: 120
  });
  const [asteroids, setAsteroids] = useState({});
  const [bullets, setBullets] = useState([]);
  //----------------------------Variables-------------------------//
  const keysPressed = useRef([]);
  const tpCache = useRef([]);
  let screenWidth = window.innerWidth;
  const level = useRef(1);
  const numOfAst = useRef();
  const timer = useRef();
  const spaceDown = useRef(0);
  const bonus = useRef();
  const isUfo = useRef(0);
  const ufoSprite = (Math.random < .1) ? 'ufo - rick' : 'ufo';
  //-------------------------GAME LOOP-------------------------//
  const loop = () => {
    setTimeout(() => {
      //This setState stays here to trigger the useState below
      //By grouping all the state changes in the useEffect we get better performance
      //but we need to change a state to loop the useEffect
      setGlobalPlayer((oldPlayer) => updatePlayer(oldPlayer, keysPressed.current, tpCache));
      checkScreenScale(screenWidth, setScreenScale);
      loop();
    }, gameSpeed);
  };

  // -----------------WHERE GAME LOGIC GOES----------------//
  useEffect(() => {
    level.current = gameState.curLevel;
    numOfAst.current = document.querySelectorAll('#asteroid-object').length;
    //update object states--
    setAsteroids((oldPositions) => updateAsteroids(oldPositions, level.current));
    if (bullets) setBullets((oldPositions) => (updateBullet(oldPositions)));
    if (isUfo.current) setUfo(old => (updateUfo(old, globalPlayer)));
    //   //UFO Checks--

    if (ufo.x > 1920) isUfo.current = 0;
    //Make bullets--
    if (globalPlayer.alive && spaceDown.current === 1 && bullets.length <= 5) {
      spaceDown.current = 2;
      playSoundCancel('bullet_snd');
      setBullets((old) => ([...old, generateBullet(globalPlayer)]));
      setTimeout(() => (spaceDown.current === 2) ? spaceDown.current = 1 : false, 200)
    }
  
    //New Level--
    if (numOfAst.current <= 0) {
      (gameState.timer <= 30) ? bonus.current = 10000 : bonus.current = 1000;
      if (gameState.curLevel === 0) bonus.current = 0;
      setGlobalPlayer(old => ({ ...old, invnsTimer: 120 }));
      setGameState(old => ({ ...old, curLevel: old.curLevel + 1, timer: 0, score: (old.score + bonus.current) }))
      setAsteroids(asteroidGeneration(asteroids, globalPlayer, 2, gameState.curLevel + 1, 0, 0, 1));
      setTimeout(() => bonus.current = 0, 3000);
    }
    //collision checks--
    checkBulletCollision(bullets, setBullets, setAsteroids, asteroids, globalPlayer, setGameState, ufo, setUfo);
    checkShipCollision(globalPlayer, setGlobalPlayer, setGameState, asteroids, ufo);
    //DONT PUT ANYMORE INTO DEPENDENCY!! globalPlayer constantly updates!
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalPlayer]);

  //-------------------------Key Input----------------------//
  //keyboard key event handlers. Keeps an array of all currently pressed keys
  const logKeyDown = (e) => {
    if (!keysPressed.current.includes(e.key)) keysPressed.current = [...keysPressed.current, e.key.toLowerCase()];
    if (keysPressed.current.includes(" ") && spaceDown.current !== 2) spaceDown.current = 1;
  };
  const logKeyUp = (e) => {
    const newKeys = keysPressed.current.filter((key) => key !== e.key.toLowerCase());
    if (!newKeys.includes(" ")) spaceDown.current = 0;
    if (newKeys !== keysPressed.current) keysPressed.current = newKeys;
  };

  //------------------USE EFFECT ON MOUNT------------------//
  useEffect(() => {
    playSound("start_snd");
    // Start Game Timer
    timer.current = setInterval(() => {
      if (!isUfo.current && Math.random() < .02) {
        playSoundCancel('ufo_snd');
        isUfo.current = 1;
      };
      setGameState((old) => ({ ...old, timer: old.timer + 1 }));
    }, 1000);
    document.addEventListener("keyup", logKeyUp);
    document.addEventListener("keydown", logKeyDown);
    loop();//Start game loop
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Stop Timer when Player Dies
  useEffect(() => {
    return () => {
      clearInterval(timer.current);
    };
  }, [globalPlayer.alive]);
  window.scrollTo(0, 0);
  document.body.style.overflow = 'hidden';
  //-----------------------JSX-------------------------//
  return (
    <>
      <div
        id="game-window"
        className="App"
        style={{ "transform": `scale(${screenScale})` }}>

        {(gameState.lives === 3 && globalPlayer.invnsTimer) ? (<div id='start-display'>{(gameState.curLevel === 1) ? "!START!" : ''}</div>) : ('')}
        {(globalPlayer.invnsTimer && gameState.curLevel !== 1 && bonus.current) ? (<div id='bonus-element'>Bonus:{bonus.current}</div>) : ('')}
        {(globalPlayer.invnsTimer && gameState.curLevel !== 1 && bonus.current !== 10000 && bonus.current) ? (<div id='no-bonus-element'>No Time Bonus</div>) : ('')}
        {/*------------ AUDIO -------------*/}
        <AudioEl />
        {/*------------- HUD  -------------*/}
        <Hud gameState={gameState} setGameState={setGameState} />
        {/* UFO */}
        <img id="ufo-object" alt="ufo" style={{ 'left': ufo.x }} src={require(`../../assets/img/${ufoSprite}.png`)}></img>
        <img id='bullet-object' alt="bullet" src={require("../../assets/img/bullet.png")} style={motion(ufo.bullet.x, ufo.bullet.y, ufo.bullet.dir)} />
        {/*--------- RENDER PLAYER / GAME OVER ---------*/}
        {globalPlayer.alive ? (
          <Player globalPlayer={globalPlayer} />
        ) : (
          <GameOver gameState={gameState} setGameState={setGameState} />
        )}
        {/*--------- RENDER BULLETS ---------*/}
        {bullets.map((pos) => {
          return pos ? (
            <img id='bullet-object' alt="bullet-sprite" src={require("../../assets/img/bullet.png")} style={motion(pos.x, pos.y, pos.dir)} />
          ) : ("");
        })}
        {/*--------- RENDER ASTEROIDS ---------*/}
        {Object.keys(asteroids).map((posId) => {
          const pos = asteroids[posId];
          return pos.alive ? <Asteroid pos={pos} posId={posId} /> : '';
        })}
      </div>
      <div id="black-bar" style={{ top: `${screenScale * 980}px` }} />
      
      {(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? 
      
      <Touch tpCache={tpCache} spaceDown={spaceDown} /> 
      
      : ("")}
    </>
  );
};
export default GameWindow;