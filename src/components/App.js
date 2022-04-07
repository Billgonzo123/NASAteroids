import React, { useState } from 'react';
import '../App.css';
import Player from './Player';

function App() {
const [gameSpeed, setGameSpeed] = useState(8); 
///the LOWER you set gameSpeed, the faster the game runs. 
///16.667 is the largest this number should ever be (1000ms/60 ie, 60 frames per second) 
///8 is best for a base speed because it updates inputs twice per frame
//we can make each level harder by increasing this slightly
  return (
    <>
     <h1>Press W: Up | A:Left | D:Right | GameSpeed: {gameSpeed}</h1>
     <div id='main-window'
      className="App">
     
      <Player gameSpeed={gameSpeed}/>

    </div>
    </>

  );
}

export default App;

