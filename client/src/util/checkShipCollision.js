import getDistance from '../util/getDistance'
import { playSound } from '../util/playSound'

function checkShipCollision(globalPlayer, setGlobalPlayer, setGameState, asteroids) {
    const { x, y, xB, yB, spriteDim, alive, invnsTimer } = globalPlayer;

    if (invnsTimer > 0) setGlobalPlayer(old => ({ ...old, invnsTimer: old.invnsTimer - 1 }));

    if (alive && invnsTimer <= 0) {
        Object.keys(asteroids).map((asteroid) => {
            const a = asteroids[asteroid];
            if (a.alive) {
                //radius is hard coded
                //player radius should be smaller than ship
                const d = spriteDim;
                const plrRadius = 30;
                const astRadius = [21, 62, 124];
                const r = astRadius[a.size];
                const dist = plrRadius + r;
                const lineA = getDistance(x + (d.w / 2), a.x + r, y + (d.h / 2), a.y + r)
                const lineB = getDistance(xB + (d.w / 2), a.x + r, yB + (d.h / 2), a.y + r)
                const lineC = getDistance(x + (d.w / 2), a.xB + r, y + (d.h / 2), a.yB + r)
                const lineD = getDistance(xB + (d.w / 2), a.xB + r, yB + (d.h / 2), a.yB + r)

                if (lineA < dist || lineB < dist || lineC < dist || lineD < dist) {

                    setGameState(old => {
                        if (old.lives <= 1) {
                            playSound('gameover')
                            //kill player. set alive to false
                            setGlobalPlayer(old => ({ ...old, x: 906, y: 478, xB: 906, yB: 478, vx: 0, vy: 0, dir: 90, alive: false }))
                            setTimeout(() => {
                                window.location = "/";
                            }, 8000);

                            return ({ ...old, lives: 0, gameOver: 1 })
                        } else {
                            playSound('player_die')
                            setGlobalPlayer(old => ({ ...old, x: 906, y: 478, xB: 906, yB: 478, vx: 0, vy: 0, dir: 90, invnsTimer: 800 }))
                            return ({ ...old, lives: old.lives - 1 })
                        }

                    });
                    return false;
                }
            }
            return false;
        });
    }

};

export default checkShipCollision;