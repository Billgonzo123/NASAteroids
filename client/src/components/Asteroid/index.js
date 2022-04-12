import React, { useEffect, useState } from 'react';

import motion from '../../util/motion';

const Player = ({ asteroids, setAsteroids, id  }) => {

  //set inital state
  let  asteroidsVars = {
    id: id,
    x: 0,
    y: 0,
    xB: 0,
    yB: 0,
    dir: 0,
    thrust: .05,
    vx: 0,
    vy: 0,
    turnSpeed: 2,
    spriteDim: { w: 54, h: 62 },
    alive: true
  }
  



   useEffect(() => {
    console.log('Asteroid Data After: id ', id, ' ', asteroidsVars)
    asteroidsVars.dir = Math.floor(Math.random() * 359);
    // setAsteroids({...asteroids,[id]: asteroidsVars})
  }, []);

  let { x, y, xB, yB, dir, vx, vy, thrust, spriteDim } = asteroidsVars;
  vx -= thrust * Math.cos((dir) * Math.PI / 180);
  vy -= thrust * Math.sin((dir) * Math.PI / 180);
  //constatley update momentum
  x += vx;
  y += vy;
  //calculate cenetr based of current x,y cord
  let center = { x: x + (spriteDim.w / 2), y: y + (spriteDim.h / 2) }

  //this loops the player around the screen. NOW BASED OFF CENTER POSITION
  //These numbers represent the actual image height and width in pixels
  if (center.y > 1080) y = 0;
  if (center.y < 0) y = 1080 - (spriteDim.h / 2);
  if (center.x > 1920) x = 0;
  if (center.x < 0) x = 1920 - (spriteDim.w / 2);
  asteroidsVars = { x, y, xB, yB, dir, vx, vy, thrust, spriteDim };



  return (
    <img
      id='asteroid-object'
      alt='asteroid-sprite'
      src={require('../../assets/asteroid_sprt.png')}
      style={motion(asteroidsVars.x, asteroidsVars.y, asteroidsVars.dir)}
    />
  )
}


export default Player;