//We need the setAsteroid setter, a number 0-2(small, medium, large) for the size of the asteroid, howMany is the number of asteroids to create
function asteroidGeneration( setAsteroids, spriteSizeIndex, howMany) {
  //these are the FILE NAMES for the different sprite sizes
  const sizes = ['asteroid_sm_sprt','asteroid_med_sprt', 'asteroid_large_sprt']
      for (let i = 1; i <= howMany; i++) {
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
              size: sizes[spriteSizeIndex],
              alive: true
            }
          })
        })
      }
    
}

export default asteroidGeneration;

