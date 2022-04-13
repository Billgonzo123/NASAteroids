import React, {useEffect } from 'react';

import motion from '../../util/motion';

// let screenWidth = window.innerWidth;


const Player = ({globalPlayer, setGlobalPlayer}) => {

 //set inital state
 let playerVars = {x: 500, y: 500, xB: 500, yB: 500, dir: 90, thrust: .05, vx: 0, vy: 0, turnSpeed: 2, spriteDim: {w: 54,h: 62}, alive: true};

 useEffect(() => {
  //set global player to initial state on mount
 setGlobalPlayer({...globalPlayer, ...playerVars});
 console.log('PLAYER STATE INITIATED!')
   },[])

   
playerVars = {...playerVars,  ...globalPlayer};


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