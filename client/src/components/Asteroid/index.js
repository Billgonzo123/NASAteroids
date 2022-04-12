import React, { useEffect } from 'react';

import motion from '../../util/motion';

const Player = ({ asteroids, setAsteroids, id  }) => {

  //set inital state
  let asteroidsVars = {
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
  };

  asteroidsVars = {...asteroidsVars,  ...asteroids[id]};


  console.log('Asteroid Data Before: id  ', id, ' ', asteroidsVars)


   useEffect(() => {
    console.log('Asteroid Data After: id ', id, ' ', asteroidsVars)
    asteroidsVars.dir = Math.floor(Math.random() * 359);
    setAsteroids({...asteroids,[id]: asteroidsVars})
  }, []);




  



 








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