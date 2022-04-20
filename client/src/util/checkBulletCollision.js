import getDistance from '../util/getDistance'
import destoryAsteroid from './destoryAsteroid';
import {stopSound} from '../util/playSound';


function checkBulletCollision(bullets, setBullets, setAsteroids, asteroids, globalPlayer, setGameState, ufo, setUfo) {
    //b is bullets state. Shortened to 'b' to reduce clutter in code


    if (bullets.length) {
        Object.keys(asteroids).map((id) => {
            //bullet has no radius
            const a = asteroids[id];
            const ufoX = ufo.x;
            const ufoY = ufo.y; 
           
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
                    const lineC = (ufoX > 0 && ufoY<1920) ? getDistance(b.x, ufoX , b.y, ufoY ) : 200;
                    if (lineC < 30) {
                        const newBullets = bullets;
                        const results = newBullets.filter((bullet, index) => index !== i);
                        stopSound('ufo_snd')
                        setBullets(results);
                        setUfo(old => ({...old, x: 2000}))
                        setGameState(old => ({...old, score: (old.score+(1000))}));
                        return false;
                    }

                    if (lineA < dist || lineB < dist) {
                        const newBullets = bullets;
                        const results = newBullets.filter((bullet, index) => index !== i);
                        setBullets(results);
                        destoryAsteroid(id, globalPlayer, asteroids, setAsteroids);
                        setGameState(old => ({...old, score: (old.score+(bonus))}));
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