import { playSound } from './playSound';
import motion from '../util/motion';

function updateBullet(bullet) {
  let { x, y, dir, thrust, vx, vy } = bullet;

  vx = -thrust * Math.cos((dir * Math.PI) / 180);
  vy = -thrust * Math.sin((dir * Math.PI) / 180);
  x += vx;
  y += vy;

  const bulletObj = {
    x: x,
    y: y,
    dir: dir,
    thrust: thrust,
    vx: vx,
    vy: vy,
  };
  return bulletObj;
}

export default updateBullet;
