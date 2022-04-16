//We need the setAsteroid setter, a number 0-2(small, medium, large) for the size of the asteroid, howMany is the number of asteroids to create
function asteroidGeneration( setAsteroids, spriteSizeIndex, howMany, setX, setY, rndPos) {
  //these are the FILE NAMES for the different sprite sizes


      for (let i = 1; i <= howMany; i++) {
        setAsteroids(old => {
          const xx = (rndPos) ? Math.floor(Math.random() * 1920) : setX;
          const yy = (rndPos) ? Math.floor(Math.random() * 1080) : setY;
          let freshId = i;
          //make sure we arent overwriting any remaining asteroids
          while (Object.keys(old).includes(freshId.toString())) {
            freshId++
          };
          return ({
            ...old, [freshId]: {
              id: freshId,
              x: xx,
              y: yy,
              xB: xx,
              yB: yy,
              dir: Math.floor(Math.random() * 100) + Math.floor(Math.random() * (i * 40)),
              thrust: 1.2,
              vx: 0,
              vy: 0,
              turnSpeed: 2,
              spriteDim: { w: 248, h: 248 },
              size: spriteSizeIndex,
              alive: true
            }
          })
        })
      }
    
}

export default asteroidGeneration;

