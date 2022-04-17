import getDistance from '../util/getDistance'
import destoryAsteroid from './destoryAsteroid';


function checkBulletCollision(bullets, setBullets, setAsteroids, asteroids, globalPlayer) {
    //b is bullets state. Shortened to 'b' to reduce clutter in code


    if (bullets.length) {
        Object.keys(asteroids).map((id) => {
            //bullet has no radius
            const a = asteroids[id];
            if (a.alive) {
                //radius is hard coded
                const astRadius = [21, 62, 124];
                const r = astRadius[a.size];
                const dist = r+5;
                
                bullets.map((b, i) => {
                    //Each bullet gets 2 lines of detection for x,y,xB,yB
                    const lineA = getDistance(b.x, a.x + r, b.y, a.y + r);
                    const lineB = getDistance(b.x, a.xB + r, b.y, a.yB + r);

                    if (lineA < dist || lineB < dist) {
                      
                        setBullets(old => (old.splice(i, 1)))
                        destoryAsteroid(id, globalPlayer, asteroids, setAsteroids)
                        return false;
                    };
                    return false;
                })

                return false;
            }
            return false;
        });
    }
};


export default checkBulletCollision;