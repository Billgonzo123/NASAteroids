import React, { useState, useEffect } from 'react';
import motion from '../../util/motion';
import updateAsteroids from '../../util/updateAsteroids';
import updatePlayer from '../../util/updatePlayer';
import { playSound, stopSound, playMenuSound } from '../../util/playSound';
import Hud from "../../components/Hud"

const MainWindow = ({ menuSoundstate, setMenuSoundState }) => {

  const [gameSpeed, setGameSpeed] = useState(8);
  const [screenScale, setScreenScale] = useState(.75);//useState(window.innerWidth / 1920);
  const [globalPlayer, setGlobalPlayer] = useState({ x: 906, y: 478, xB: 500, yB: 500, dir: 90, thrust: .05, vx: 0, vy: 0, turnSpeed: 2, spriteDim: { w: 54, h: 62 }, alive: true });
  const [asteroids, setAsteroids] = useState({});
  const [bullets, setBullets] = useState({});
  const [gameState, setGameState] = useState({ curLevel: 1, score: 0, exp: 0, playerLevel: 0, numberOfAsteroids: 0 });
  const [timer, setTimer] = useState(0);
  const [currentKeys, setCurrentKeys] = useState([]);


  //----------------------------------------------------------- Cnsturctor Scope Variables------------------------------------------------------//
  // //this will hold the currently pressed keys
  let keysPressed = [];
  //generate multiple asteroids based on game level
  let screenWidth = window.innerWidth;
  //list of all audio files


  // -------------------------------------------------------Game Loop----------------------------------------------//
  const loop = () => {
    setTimeout(() => {
      //check how many asteroid-object there are
      const numOfAst = document.querySelectorAll('#asteroid-object').length;
      setGameState({ ...gameState, numberOfAsteroids: numOfAst });
      setGlobalPlayer(oldPlayer => updatePlayer(oldPlayer, keysPressed))
      setAsteroids(oldOpsitions => updateAsteroids(oldOpsitions))
      //check for a change in screen size and change scale if change
      if (screenWidth !== window.innerWidth) {
        screenWidth = window.innerWidth;
        setScreenScale((window.innerWidth) / 1920);
      }
      //updates state with current keys. We dont really wnat this state updtaed as fast as the keysPressed variable, so we put it in the loop
      setCurrentKeys(old => [...keysPressed]);

      //----------------------------------This is just an example of how to use playMenuSound function-------------------------------//
      if (keysPressed.includes('m')) playMenuSound('confirmA', setMenuSoundState);

      //timer for timer stuff
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
    for (let i = 1; i <= gameState.curLevel+3; i++) {
      setAsteroids(old => {
        const xrnd = Math.floor(Math.random() * 1920);
        const yrnd = Math.floor(Math.random() * 1080);
        return ({
          ...old, [i]: {
            id: i,
            x: xrnd,
            y: yrnd,
            xB: xrnd,
            yB: yrnd,
            dir: Math.floor(Math.random() * 100) + Math.floor(Math.random() * (i * 40)),
            thrust: .8,
            vx: 0,
            vy: 0,
            turnSpeed: 2,
            spriteDim: { w: 248, h: 248 },
            alive: true
          }
        })
      })
    }
    loop();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])





  return (
    <div id='game-window'
      className="App"
      style={{ left: (window.innerWidth - (1920)) / 2, "transform": `scale(${screenScale})` }}>

      {/*------------ AUDIO -------------*/}
      {/* for every sound effect, there must be an audio element with an id of the file name */}

      <audio id='engine_snd' src={require(`../../assets/snd/player_snd/engine_snd.wav`)} loop type='audio/wav' />
      {/*------------- HUD  -------------*/}
      <Hud />

      {/*--------- RENDER PLAYER ---------*/}
      {globalPlayer.alive ? (
        <>
          <img
            id='player-object'
            className={currentKeys.includes('w') ? 'fire' : ''}
            alt='player-sprite'
            src={require('../../assets/img/player_sprt.png')}
            style={motion(globalPlayer.x, globalPlayer.y, globalPlayer.dir)} />
          {globalPlayer.xB !==globalPlayer.x && <img
            id='player-object'
            className={currentKeys.includes('w') ? 'fire' : ''}
            alt='player-sprite'
            src={require('../../assets/img/player_sprt.png')}
            style={motion(globalPlayer.xB, globalPlayer.y, globalPlayer.dir)} />}
          {globalPlayer.yB !==globalPlayer.y && <img
            id='player-object'
            className={currentKeys.includes('w') ? 'fire' : ''}
            alt='player-sprite'
            src={require('../../assets/img/player_sprt.png')}
            style={motion(globalPlayer.x, globalPlayer.yB, globalPlayer.dir)} />}
          {globalPlayer.xB !==globalPlayer.x && globalPlayer.yB !==globalPlayer.y &&<img
            id='player-object'
            className={currentKeys.includes('w') ? 'fire' : ''}
            alt='player-sprite'
            src={require('../../assets/img/player_sprt.png')}
            style={motion(globalPlayer.xB, globalPlayer.yB, globalPlayer.dir)} />}
        </>
      ) : (
        // render death animation elements here
        ""
      )
      }

      {/*--------- RENDER ASTEROIDS ---------*/}
      {Object.keys(asteroids).map(posId => {
        const pos = asteroids[posId];
        return pos.alive ? (
          //our asteroid has the potential to reneder at 4 places at once, so we need 4 elements per asteroid!
          <>

          <img
            key={posId}
            id='asteroid-object'
            alt='asteroid-sprite'
            src={require('../../assets/img/asteroid_large_sprt.png')}
            style={motion(pos.x, pos.y, pos.dir)} />

          {pos.xB !== pos.x && <img
            key={posId + 'a'}
            id='asteroid-shadow'
            alt='asteroid-sprite'
            src={require('../../assets/img/asteroid_large_sprt.png')}
            style={motion(pos.xB, pos.y, pos.dir)} />}

          {pos.yB !== pos.y && <img
            key={posId + 'b'}
            id='asteroid-shadow'
            alt='asteroid-sprite'
            src={require('../../assets/img/asteroid_large_sprt.png')}
            style={motion(pos.x, pos.yB, pos.dir)} />}


          {pos.yB !== pos.y && pos.xB !== pos.x && <img
            key={posId + 'c'}
            id='asteroid-shadow'
            alt='asteroid-sprite'
            src={require('../../assets/img/asteroid_large_sprt.png')}
            style={motion(pos.xB, pos.yB, pos.dir)} />}
     
        </>

        ) : (
          ""
        );
      })}

    </div>

  )

}

export default MainWindow;
