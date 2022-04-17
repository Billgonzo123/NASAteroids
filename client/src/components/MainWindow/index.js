import React, { useState, useEffect, useRef } from 'react';

//utilities
import motion from '../../util/motion';
import updateAsteroids from '../../util/updateAsteroids';
import updatePlayer from '../../util/updatePlayer';
import updateBullet from '../../util/updateBullet';
import { playSound, stopSound, playMenuSound } from '../../util/playSound';
import { checkScreenScale } from '../../util/checkScreenScale';
import asteroidGeneration from '../../util/asteroidGeneration';
import destoryAsteroid from '../../util/destoryAsteroid';
import Hud from '../../components/Hud';
import Player from '../Player';
import Asteroid from '../Asteroid';

const MainWindow = ({
  gameState,
  setGameState,
  menuSoundstate,
  setMenuSoundState,
}) => {
  const [gameSpeed, setGameSpeed] = useState(8);
  const [screenScale, setScreenScale] = useState(window.innerWidth / 1920);
  const [globalPlayer, setGlobalPlayer] = useState({
    x: 906,
    y: 478,
    xB: 500,
    yB: 500,
    dir: 90,
    thrust: 0.05,
    vx: 0,
    vy: 0,
    turnSpeed: 2,
    spriteDim: { w: 54, h: 62 },
    alive: true,
  });

  const [asteroids, setAsteroids] = useState({});
  const [bullets, setBullets] = useState({});
  const [timer, setTimer] = useState(0);
  const [currentKeys, setCurrentKeys] = useState([]);

  let keysPressed = [];
  let screenWidth = window.innerWidth;

  //*GAME LOOP
  const loop = () => {
    setTimeout(() => {
      const numOfAst = document.querySelectorAll('#asteroid-object');

      //states
      setGameState((old) => ({ ...old, numberOfAsteroids: numOfAst.length }));
      setGlobalPlayer((oldPlayer) => updatePlayer(oldPlayer, keysPressed));
      setAsteroids((oldPositions) => updateAsteroids(oldPositions));
      setBullets((oldPositions) => updateBullet(oldPositions));

      //check for a change in screen size and change scale if change
      checkScreenScale(screenWidth, setScreenScale);

      //updates state with current keys. We dont really want this state updated as fast as the keysPressed variable, so we put it in the loop
      setCurrentKeys((old) => [...keysPressed]);

      //menu sound example
      if (keysPressed.includes('m'))
        playMenuSound('confirmA', setMenuSoundState);

      //timer for timer stuff
      setTimer((old) => old + 1);

      loop();
    }, gameSpeed);
  };

  //* UseEffect FOR GAME LOGIC STUFF THAT REQUIRES STATES
  useEffect(() => {
    //pew pew 🔫
    function generateBullet(player) {
      const bulletObj = {
        alive: true,
        dir: player.dir,
        spriteDim: {
          w: 13,
          h: 13,
        },
        x: player.x,
        y: player.y,
        vx: 0,
        vy:0,
        thrust: 2,
      };

      // const newBulletObj = updateBullet(bulletObj);

      // //need to cap at 5
      setBullets((old) => [...old, bulletObj]);
    }

    if (currentKeys.includes(' ')) {
      playSound('bullet_snd');
      generateBullet(globalPlayer);
    }

    //asteroidGeneration( setAsteroids, globalPlayer, spriteSizeIndex, howMany, setX, setY, rndPos)
    if (gameState.numberOfAsteroids <= 0)
      asteroidGeneration(
        setAsteroids,
        globalPlayer,
        2,
        gameState.curLevel + 3,
        0,
        0,
        1
      );

    //------------TEST ASTEROID DESTRUCTION ---------------------------------------------------------
    //destoryAsteroid = (id, globalPlayer, asteroids , setAsteroids)
    if (currentKeys.includes('x'))
      destoryAsteroid('1', globalPlayer, asteroids, setAsteroids);
    //-----------------------------------------------------------------------------------------------

    //DONT PUT STATE: asteroids INTO DEPENDENCY!!
  }, [gameState, setGameState, timer, currentKeys]);

  //* Key Input
  //keyboard key event handlers. Keeps an array of all currently pressed keys
  const logKeyDown = (e) => {
    e.preventDefault();
    if (!keysPressed.includes(e.key)) {
      keysPressed = [...keysPressed, e.key];
      console.log('Pressed: ', keysPressed);
    }
  };

  const logKeyUp = (e) => {
    e.preventDefault();
    const newKeys = keysPressed.filter((key) => key !== e.key);
    if (newKeys !== keysPressed) keysPressed = newKeys;
    console.log('Released: ', keysPressed);
  };

  //...........................................USE EFFECT ON MOUNT------------------------------//
  useEffect(() => {
    document.addEventListener('keyup', logKeyUp);
    document.addEventListener('keydown', logKeyDown);
    loop();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('bullets -- how often does this pop up?', bullets)
  return (
    <>
      <div
        id="game-window"
        className="App"
        style={{ transform: `scale(${screenScale})` }}
      >
        {/*------------ AUDIO -------------*/}
        {/* for every sound effect, there must be an audio element with an id of the file name */}
        <audio
          id="engine_snd"
          src={require(`../../assets/snd/player_snd/engine_snd.wav`)}
          loop
          type="audio/wav"
        />
        <audio
          id="bullet_snd"
          src={require(`../../assets/snd/bullet_snd/bullet_snd.wav`)}
          loop
          type="audio/wav"
        />
        {/*------------- HUD  -------------*/}
        <Hud />
        {/*--------- RENDER PLAYER ---------*/}
        {globalPlayer.alive ? (
          <Player currentKeys={currentKeys} globalPlayer={globalPlayer} />
        ) : (
          ''
        )}
        {/*--------- RENDER BULLETS ---------*/}
        {bullets.map((posId) => {
          console.log('bullets in render', bullets);
          console.log('posId', posId);
          const pos = bullets[posId];
          const style = {
            position: "absolute",
            top: pos.y,
            left: pos. x,
          }
          return pos ? (
            <img
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
          //add asteroids to game
          return pos.alive ? <Asteroid pos={pos} posId={posId} /> : '';
        })}
      </div>
      <div id="black-bar" style={{ top: `${screenScale * 1080}px` }} />
    </>
  );
};

export default MainWindow;
