import rndAstPos from "../gameUtils/rndAstPos";

/*We need the setAsteroid setter, 
A number 0-2(small, medium, large) for the size of the asteroid, 
'howMany' is the number of asteroids to create, 
setX and setY are the specific coordinates to place the asteroids, 
rndPos is boolean for if each (x,y) cordinate should be random or not*/
function asteroidGeneration( asteroids, globalPlayer, spriteSizeIndex, howMany, setX, setY, rndPos) {
  let newAsteroids = {...asteroids};
  const directionSeed = (360 / howMany);
  for (let i = 1; i <= howMany; i++) {
    
    const randomPositions = rndAstPos(globalPlayer);
      //decide if (x,y) shoudl be random
      const xx = (rndPos) ? randomPositions.x : setX;
      const yy = (rndPos) ? randomPositions.y : setY;
      //get the sprite dimentions (they are square)
      const astSizes = [62, 124, 248];
      const pix = astSizes[spriteSizeIndex];
      let freshId = i;
      //make sure we arent overwriting any remaining asteroids
      while (Object.keys(asteroids).includes(freshId.toString()) || Object.keys(newAsteroids).includes(freshId.toString())) {
        freshId = freshId+1;
      };

      const accl = 2;
      const ranDir = (directionSeed * i) + Math.floor(Math.random() * (360 / howMany))

      newAsteroids[freshId] = {
          id: freshId,
          x: xx,
          y: yy,
          xB: xx,
          yB: yy,
          dir: ranDir,
          thrust: accl,
          vx: -accl * Math.cos((ranDir) * Math.PI / 180),
          vy: -accl * Math.sin((ranDir) * Math.PI / 180),
          turnSpeed: 2,
          spriteDim: { w: pix, h: pix },
          size: spriteSizeIndex,
          alive: true
        }
      };
    
      return newAsteroids;
  }

export default asteroidGeneration;

