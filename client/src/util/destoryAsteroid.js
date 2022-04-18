import asteroidGeneration from "./asteroidGeneration";
import { playSound, stopSound } from "./playSound";


const destoryAsteroid = async (id, globalPlayer, asteroids, setAsteroids) => {


    if (asteroids[id].alive) {
        stopSound('asteroid_die');
        playSound('asteroid_die');
        const oldSize = asteroids[id].size;
        const newX = asteroids[id].x;
        const newY = asteroids[id].y;

        //smallest asteroid size = 0. If smallest size dont make more asteroids
   
        //asteroidGeneration(setAsteroids, globalPlayer, spriteSizeIndex, howMany, setX, setY, rndPos)
        await setAsteroids(old => ({ ...old, [id]: { ...old[id], alive: false } }));

        if (oldSize) asteroidGeneration(setAsteroids, globalPlayer, oldSize - 1, 3, newX, newY, 0);

        //kill the asteroid with id
       
    }
};

export default destoryAsteroid;