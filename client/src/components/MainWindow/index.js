import React, { useState, useEffect } from 'react';
import Player from '../Player';

const MainWindow = ({ globalPlayer, setGlobalPlayer, asteroids, setAsteroids, bullets, setBullets, gameState, setGameState, screenScale,setScreenScale, gameSpeed, setGameSpeed }) => {
    ///main game loop here


    // //finds the center point of the object based off prite dimentions
  

    // //this will hold the currently pressed keys
    let keysPressed = [];
    let { x, y, xB, yB, dir, thrust, vx, vy, turnSpeed, spriteDim, alive} = globalPlayer;
    let screenWidth = window.innerWidth;
    // //main loop for updating player position
    function loop() {
    
      //if 'w' key opressed, add velocity in direction
      if (keysPressed.includes('w')) {
        vx -= thrust * Math.cos((dir) * Math.PI / 180);
        vy -= thrust * Math.sin((dir) * Math.PI / 180);
      }

      //constatley update momentum
      x += vx;
      y += vy;
      //calculate cenetr based of current x,y cord
      let center ={x: x+(spriteDim.w/2), y: y+(spriteDim.h/2)} 

      //this loops the player around the screen. NOW BASED OFF CENTER POSITION
      //These numbers represent the actual image height and width in pixels
      if (center.y > 1080) y= 0;
      if (center.y < 0) y= 1080-(spriteDim.h/2);
      if (center.x > 1920) x= 0;
      if (center.x < 0) x= 1920-(spriteDim.w/2);

      //recalc center
      center ={x: x+(spriteDim.w/2), y: y+(spriteDim.h/2)} 

      //Rotate ship whe A or D pressed
      if (keysPressed.includes('d')) {
        (dir < 360) ? dir += turnSpeed : dir = 0;
      }
      if (keysPressed.includes('a')) {
        (dir <= 0) ? dir = 360 : dir -= turnSpeed;
      }

       //update state
   
           //check for a change in screen size and change scale if change
      if (screenWidth !== window.innerWidth) {
        screenWidth = window.innerWidth;
        console.log('Window Width: ', screenWidth)
        //setScreenScale((screenWidth)/1920);
      }
           ////update all states at the end
      setGlobalPlayer({ ...globalPlayer, x: x, y: y, xB: xB, yB: yB, vx: vx, vy: vy, dir: dir, alive: alive });
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


    return (
        <div id='main-window'
            className="App"
            style={{ "transform": `scale(${screenScale})` }}>

            <Player 
            globalPlayer = {globalPlayer}
            setGlobalPlayer = {setGlobalPlayer}
            />

        </div>
    )

}

export default MainWindow;