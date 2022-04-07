import React, { useState, useEffect } from 'react';



const Player = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0, dir: 90, speed: .1, currentSpeed: 0, topSpeed: 10, slowDown: .05 });
  let { x, y, dir, speed, currentSpeed, topSpeed, slowDown } = playerPosition;
  let keysPressed = [];

  function loop() {

    if (keysPressed.includes('w')) {
      (currentSpeed < topSpeed) ? currentSpeed += speed : currentSpeed = topSpeed;
      x -= currentSpeed * Math.cos(dir * Math.PI / 180);
      y -= currentSpeed * Math.sin(dir * Math.PI / 180);

    }

    if (!keysPressed.includes('w')) {
      if (currentSpeed > 0) {
        currentSpeed -= slowDown 
      x -= currentSpeed * Math.cos(dir * Math.PI / 180);
      y -= currentSpeed * Math.sin(dir * Math.PI / 180);
    }else {
       currentSpeed = 0;
    }

    }


    if (keysPressed.includes('d')) {
      (dir < 360) ? dir += 2 : dir = 0;
     

    }
    if (keysPressed.includes('a')) {
      (dir <= 0) ? dir = 360 : dir -= 2;
  
    }


    console.log('POSITION: ', playerPosition);
    console.log('CURR: ', keysPressed);
    setPlayerPosition({ ...playerPosition, x: x, y: y, dir: dir, currentSpeed: currentSpeed });

    setTimeout(() => {
      loop()
    }, 16.67)
  }



  useEffect(() => {
    loop();
  }, [])

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
  document.addEventListener('keyup', logKeyUp);
  document.addEventListener('keydown', logKeyDown);





  return (
    <img
      id='player-object'
      alt='player-sprite'

      src={require('../../assets/player_sprt.png')}
      style={{ "top": `${playerPosition.y}px`, "left": `${playerPosition.x}px`, "transform": `rotate(${playerPosition.dir - 90}deg)` }}
    />
  )
}


export default Player;