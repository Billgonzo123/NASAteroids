import React from 'react';

export default calcScore = (setGameState) => {
  setGameState(old => {
    const { curLevel, score, exp, lives, playerLevel, numberOfAsteroids, time } = old;


    const newScore;

    return {...old, score: newScore};
  })
}; 

