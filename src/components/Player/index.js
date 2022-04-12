import React, { useState, useEffect } from 'react';

import motion from '../../utils/motion';

// let screenWidth = window.innerWidth;



const Player = (globalPlayer, setGlobalPlayer) => {

 //set inital state
 let playerVars = { x: 500, y: 500, xB: 500, yB: 500, dir: 90, thrust: .05, vx: 0, vy: 0, turnSpeed: 2, spriteDim: {w: 54,h: 62}, alive: true};

 useEffect(() => {
  //set global player to initial state on mount
  globalPlayer.setGlobalPlayer({...globalPlayer, ...playerVars});
   },[])

playerVars = {...playerVars,  ...globalPlayer.globalPlayer};

// console.log(motion(playerVars.x, playerVars.y,playerVars.dir))


 /*
   NOTES ABOUT ROTATION:
   math.cos and Math.sin consider a RIGHT to be 0 deg, where  "transform: rotate()" in CSS considers UP to be 0 degrees
   We have to compensate for this by subtracting 90 from the players direction.
   This works because "transform: rotate()" will acept negative numbers where sin and cos cannot take negative numbers
 */
  return (
    <img
      id='player-object'
      alt='player-sprite'
      src={require('../../assets/player_sprt.png')}
      style={motion(playerVars.x, playerVars.y,playerVars.dir)}
    />
  )
}


export default Player;