import React from 'react';
import '../App.css';
import MainWindow from './MainWindow';
import Button from './Button';


function App() {

  return (
    <>
      <div className="nes-container with-title is-centered">
        <p className="title">Controls</p>
        <h1>Press W: Up | A:Left | D:Right |</h1>
      </div>
      <Button />
    
      <MainWindow/>
    
    </>

  );
}

export default App;

