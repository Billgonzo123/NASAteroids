import React, { useState } from 'react';
import '../App.css';
import Player from './Player';

function App() {

  // const [keysPressed, setKeyPressed] = useState([]);
  const [keysPressed, setKeysPressed] = useState([]);


    function logKeyDown(e) {

      if (!keysPressed.includes(e.key)) {
        setKeysPressed([...keysPressed, e.key]);
        console.log('Pressed: ', keysPressed);
      }
  

    }


    function logKeyUp(e) {
      const newKeys = keysPressed.filter(key => key !== e.key);
      if (newKeys !== keysPressed) setKeysPressed(newKeys);
      console.log('Pressed: ', keysPressed);
    }



  console.log('Pressed: ', keysPressed);

  return (
    <div id='main-window'
      tabIndex={-1}
      onKeyUp={logKeyUp}
      onKeyDown={logKeyDown}

      keclassName="App">
      <h1>Press W: Up A:Left D:Right</h1>
      <Player keysPressed={keysPressed} />

    </div>
  );
}

export default App;

