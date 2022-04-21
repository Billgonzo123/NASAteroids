import getDistatce from "../gameUtils/getDistance";
import { playSoundCancel, stopSound } from '../playSound';
function updateUfo(ufo, player) {
    let newBullet = {};
    const bullet = ufo.bullet;
    const ufoX = ufo.x;
    const ufoY = ufo.y;
    let newX = ufoX + 20;

    if (bullet.timer) {
        if (bullet.timer > 0) {
            let { x, y, dir, vx, vy } = bullet;
            x -= vx;
            y -= vy;
            if (y > 980) y = 0;
            if (y < 0) y = 980;
            if (x > 1920) x = 0;
            if (x < 0) x = 1920;
            newBullet = {
                x: x,
                y: y,
                dir: dir,

                vx: vx,
                vy: vy,
                timer: ufo.bullet.timer - 10
            }
        }
    } else {
        const dx = player.x - ufoX;
        const dy = player.y - ufoY;
        const ang = Math.atan2(dy, dx) * 180 / Math.PI;
        if (ufoX > 50) playSoundCancel('bullet_snd');
        newBullet = {
            dir: ang,
            x: ufoX + 50,
            y: ufoY + 50,
            vx: -15 * Math.cos((ang * Math.PI) / 180),
            vy: -15 * Math.sin((ang * Math.PI) / 180),
            timer: 500
        }
    }
    if (getDistatce(bullet.x, player.x + 27, bullet.y, player.y + 32) < 31) newBullet = {};
    if (ufoX < 50 || ufoX >= 1920) newBullet = { ...bullet, x: -1000 };
    if (ufoX > 1920) {
        stopSound('ufo_snd');
        newX = -200;
    }

    return { ...ufo, x: newX, bullet: newBullet };
}



export default updateUfo;