import React, { useState, useEffect } from 'react';




let  playerPosition = { x: 0, y: 0, dir: 90 };
let  playerMovement = { speed: 3, currentSpeed: 0, topSpeed: 10, slowDown: 2 };

const Player = ({  keysPressed }) => {
  
function testLoop (){

    let { x, y, dir } = playerPosition;
    let { speed, currentSpeed, topSpeed, slowDown } = playerMovement;


    if (keysPressed.includes('w')) {
        (currentSpeed < topSpeed) ? currentSpeed += speed : currentSpeed = topSpeed;
        x -= currentSpeed * Math.cos(dir * Math.PI / 180);
        y -= currentSpeed * Math.sin(dir * Math.PI / 180);
        playerPosition = { ...playerPosition, x: x, y: y };
        playerMovement = { ...playerMovement, currentSpeed: currentSpeed };
    }


    if (keysPressed.includes('d')) {
        (dir < 360) ? dir += 2 : dir = 0;
        playerPosition = { ...playerPosition, dir: dir };
    }
    if (keysPressed.includes('a')) {
        (dir <= 0) ? dir = 360 : dir -= 2;
        playerPosition = { ...playerPosition, dir: dir };
    }


  console.log('POSITION: ',playerPosition);
  console.log('CURR: ',keysPressed);
    // setTimeout(testLoop, 16.67)
}

 

useEffect(() => {
testLoop()
}, [keysPressed])


return (
    <img
        id='player-object'
        alt='player-sprite'
        tabIndex={-1}

        src={require('../../assets/player_sprt.png')}
        style={{ "top": `${playerPosition.y}px`, "left": `${playerPosition.x}px`, "transform": `rotate(${playerPosition.dir - 90}deg)` }}
    />
)
}


export default Player;