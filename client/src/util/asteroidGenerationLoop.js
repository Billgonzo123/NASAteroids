
function asteroidGenerationLoop(gameState, setGameState, setAsteroids) {
  if (gameState.numberOfAsteroids <= 0)  {
      for (let i = 1; i <= gameState.curLevel + 3; i++) {
        setAsteroids(old => {
          const xrnd = Math.floor(Math.random() * 1920);
          const yrnd = Math.floor(Math.random() * 1080);
          let freshId = i;
          //make sure we arent overwriting any remaining asteroids
          while (Object.keys(old).includes(freshId.toString())) {
            freshId++
          };

          return ({
            ...old, [freshId]: {
              id: freshId,
              x: xrnd,
              y: yrnd,
              xB: xrnd,
              yB: yrnd,
              dir: Math.floor(Math.random() * 100) + Math.floor(Math.random() * (i * 40)),
              thrust: .8,
              vx: 0,
              vy: 0,
              turnSpeed: 2,
              spriteDim: { w: 248, h: 248 },
              alive: true
            }
          })
        })
      }
    
  }
}

export default asteroidGenerationLoop;