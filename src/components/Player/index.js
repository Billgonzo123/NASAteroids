import React, { useState, useEffect } from 'react';

let keysPressed = [];

const Player = () => {
  const  [playerPosition,setPlayerPosition] = useState({ x: 0, y: 0, dir: 90 });
  const  [playerMovement, setPlayerMovement] = useState({ speed: 3, currentSpeed: 0, topSpeed: 10, slowDown: 2 });
  let { x, y, dir } = playerPosition;
  let { speed, currentSpeed, topSpeed, slowDown } = playerMovement;


    function loop(){


      function logKeyDown(e) {

        if (!keysPressed.includes(e.key)) {
            keysPressed = [...keysPressed, e.key];
          console.log('Pressed: ', keysPressed);
        }
      
      
      }
      
      function logKeyUp(e) {
        const newKeys = keysPressed.filter(key => key !== e.key);
        if (newKeys !== keysPressed) keysPressed =newKeys;
        console.log('Released: ', keysPressed);
      }



      if (keysPressed.includes('w')) {
          (currentSpeed < topSpeed) ? currentSpeed += speed : currentSpeed = topSpeed;
          x -= currentSpeed * Math.cos(dir * Math.PI / 180);
          y -= currentSpeed * Math.sin(dir * Math.PI / 180);
          setPlayerPosition({ ...playerPosition, x: x, y: y });
          setPlayerMovement({ ...playerMovement, currentSpeed: currentSpeed });
      }
  
  
      if (keysPressed.includes('d')) {
          (dir < 360) ? dir += 2 : dir = 0;
          setPlayerPosition({ ...playerPosition, dir: dir });
      }
      if (keysPressed.includes('a')) {
          (dir <= 0) ? dir = 360 : dir -= 2;
          setPlayerPosition({ ...playerPosition, dir: dir });
      }
    console.log('POSITION: ',playerPosition);
    console.log('CURR: ',keysPressed);
    document.body.addEventListener('keydown', logKeyDown);
    document.body.addEventListener('keyUp', logKeyUp);

    setTimeout(() => {

      loop()
    }, 16.67)
  }



  useEffect(()=>{
loop();
  },[])







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