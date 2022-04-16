import asteroidGeneration from "./asteroidGeneration";


const destoryAsteroid = (id, asteroids, setAsteroids) => {
    console.log('BOOM!!!!')
    if (asteroids[id].alive) {
        const oldSize = asteroids[id].size;
        const newX = asteroids[id].x;
        const newY = asteroids[id].y;

        //smallest asteroid size = 0. If smallest size dont make more asteroids
        //asteroidGeneration( setAsteroids, spriteSizeIndex, howMany, setX, setY, rndPos)
        if (oldSize) asteroidGeneration(setAsteroids, oldSize - 1, 5 - oldSize, newX, newY, 0);

        //kill the asteroid with id
        setAsteroids(old => ({ ...old, [id]: { ...old[id], alive: false } }))
    }
};

export default destoryAsteroid;