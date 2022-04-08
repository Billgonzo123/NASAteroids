import React, { useState, useEffect } from 'react';


const Player = ({ gameSpeed }) => {

  /* 
  This is the players state. In the actual build we need to make these states global so that every element can have access to them for collision detection
  Every user will have a Level that dictates what the inital state should be
  Description of all states:
  - x & y: These are the x and y cordinates. (0,0) is the TOP LEFT corner of the screen. I set the to 500x500 so they dont start in the corner
  - dir: this is the direction in degrees of the players ship
  - force: This dictates acceleration in a direction
  - vx and vy: Change in velocity for x and y
  - turnSpeed: the rate in pixles the player can turn

  NOTE: x and y account for the TOP LEFT corner of the player image. We can compensate for this by adding half the width and half the height of the image to these values

  */
  const [playerPosition, setPlayerPosition] = useState({ x: 500, y: 500, dir: 90, thrust: .05, vx: 0, vy: 0, turnSpeed: 2 });

  //pull out those states
  let { x, y, dir, thrust, vx, vy, turnSpeed } = playerPosition;

  //this will hold the currently pressed keys
  let keysPressed = [];

  //main loop for updating player position
  function loop() {
    if (keysPressed.includes('w')) {
      vx -= thrust * Math.cos((dir) * Math.PI / 180);
      vy -= thrust * Math.sin((dir) * Math.PI / 180);
    }

    //constatley update momentum
    x += vx;
    y += vy;

    //this loops the player around the screen. 
    //These numbers represent the actual image height and width in pixels
    if (y > window.innerHeight) y=-62;
    if (y < -62) y= window.innerHeight;
    if (x > window.innerWidth) x=-54;
    if (x < -54) x= window.innerWidth;

    //Rotate ship whe A or D pressed
    if (keysPressed.includes('d')) {
      (dir < 360) ? dir += turnSpeed : dir = 0;
    }
    if (keysPressed.includes('a')) {
      (dir <= 0) ? dir = 360 : dir -= turnSpeed;
    }

     //update state
    setPlayerPosition({ ...playerPosition, x: x, y: y,vx: vx, vy: vy, dir: dir });

    //loop the code every <gameSpeed>ms
    setTimeout(() => {
      loop()
    }, gameSpeed)
  }



  //keyboard key event handlers. Keeps an array of all currently pressed keys
  function logKeyDown(e) {
    e.preventDefault()
    if (!keysPressed.includes(e.key)) {
      keysPressed = [...keysPressed, e.key];
      console.log('Pressed: ', keysPressed);
    }
  }

  function logKeyUp(e) {
    e.preventDefault()
    const newKeys = keysPressed.filter(key => key !== e.key);
    if (newKeys !== keysPressed) keysPressed = newKeys;
    console.log('Released: ', keysPressed);
  }


  //when the component is mounted, we initiate event listeners for keyup and keydown and start the loop
  useEffect(() => {
    document.addEventListener('keyup', logKeyUp);
    document.addEventListener('keydown', logKeyDown);
    loop();
  }, [])

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
      svyle={{ "top": `${playerPosition.y}px`, "left": `${playerPosition.x}px`, "transform": `rotate(${playerPosition.dir - 90}deg) ` }}
    />
  )
}


export default Player;