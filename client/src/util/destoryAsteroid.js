import asteroidGeneration from "./asteroidGeneration";

//asteroidGeneration( setAsteroids, spriteSizeIndex, howMany, setX, setY, rndPos)
const destoryAsteroid = (id, asteroids , setAsteroids) => {
    console.log('BOOM!!!!')
      if (asteroids[id].alive) {
          const oldSize = asteroids[id].size;
          const newX = asteroids[id].x;
          const newY = asteroids[id].y;

        asteroidGeneration(setAsteroids, oldSize-1, 5-oldSize, newX, newY, 0 );
        setAsteroids(old => ({ ...old, [id]: { ...old[id], alive: false } }))
       
      }
};

export default destoryAsteroid;