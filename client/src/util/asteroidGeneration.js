import rndAstPos from "./rndAstPos";

/*We need the setAsteroid setter, 
A number 0-2(small, medium, large) for the size of the asteroid, 
'howMany' is the number of asteroids to create, 
setX and setY are the specific coordinates to place the asteroids, 
rndPos is boolean for if the (x,y) cordinates should be random or not*/
function asteroidGeneration(setAsteroids, globalPlayer, spriteSizeIndex, howMany, setX, setY, rndPos) {
  const directionSeed = (360 / howMany);
  for (let i = 1; i <= howMany; i++) {
    const randomPositions = rndAstPos(globalPlayer);
    setAsteroids(old => {
    
      //decide if (x,y) shoudl be random
      const xx = (rndPos) ? randomPositions.x : setX;
      const yy = (rndPos) ? randomPositions.y : setY;
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
          dir: (directionSeed * i) + Math.floor(Math.random() * (360 / howMany)),
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

