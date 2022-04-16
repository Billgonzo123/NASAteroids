import { playSound } from './playSound';
import motion from '../util/motion';

function updateBullet(globalPlayer, keysPressed) {
  let { x, y, xB, yB, dir, thrust, vx, vy, turnSpeed, spriteDim, alive } =
    globalPlayer;

  vx = -thrust * Math.cos((dir * Math.PI) / 180);
  vy = -thrust * Math.sin((dir * Math.PI) / 180);

  x += vx;
  y += vy;

  return { x, y, xB, yB, dir, thrust, vx, vy, turnSpeed, spriteDim, alive };
}

export default updateBullet;
