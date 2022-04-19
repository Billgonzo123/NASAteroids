import getDistance from '../util/getDistance'
import destoryAsteroid from './destoryAsteroid';


function checkBulletCollision(bullets, setBullets, setAsteroids, asteroids, globalPlayer, setGameState) {
    //b is bullets state. Shortened to 'b' to reduce clutter in code


    if (bullets.length) {
        Object.keys(asteroids).map((id) => {
            //bullet has no radius
            const a = asteroids[id];
            if (a.alive) {
                //radius is hard coded
                const astRadius = [23, 62, 124];
                const r = astRadius[a.size];
                const dist = r+5;
                const bonusScores = [100, 50, 20];
                const bonus = bonusScores[a.size]
                
                bullets.map((b, i) => {
                    //Each bullet gets 2 lines of detection for x,y,xB,yB
                    const lineA = getDistance(b.x, a.x + r, b.y, a.y + r);
                    const lineB = (a.x !== a.xB && a.y !== a.yB) ? getDistance(b.x, a.xB + r, b.y, a.yB + r) : 200;

                    if (lineA < dist || lineB < dist) {
                        const newBullets = bullets;
                        const results = newBullets.filter((bullet, index) => index !== i);
                        setBullets(results);
                        destoryAsteroid(id, globalPlayer, asteroids, setAsteroids);
                        setGameState(old => ({...old, score: (old.score+(bonus)*old.curLevel)}));
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