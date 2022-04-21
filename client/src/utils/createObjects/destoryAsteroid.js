import asteroidGeneration from "./asteroidGeneration";
import { playSoundCancel} from "../playSound";


const destoryAsteroid =  (id, globalPlayer, asteroids, setAsteroids) => {
    if (asteroids[id].alive) {
        playSoundCancel('asteroid_die');
        const oldSize = asteroids[id].size;
        const newX = asteroids[id].x;
        const newY = asteroids[id].y;
        //smallest asteroid size = 0. If smallest size dont make more asteroids
        //asteroidGeneration(setAsteroids, globalPlayer, spriteSizeIndex, howMany, setX, setY, rndPos)
        if (oldSize) {
            const newAsteroids = asteroidGeneration(asteroids, globalPlayer, oldSize - 1, 3, newX, newY, 0);
                  //kill the asteroid with id and add new ones
             setAsteroids(old => ({ ...old, ...newAsteroids, [id]: { ...old[id], alive: false } }));
        } else {
                  //kill the asteroid with id
             setAsteroids(old => ({ ...old, [id]: { ...old[id], alive: false } }));
        }
    }
};

export default destoryAsteroid;