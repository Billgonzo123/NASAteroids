function updateBullet(bullets) {
  const newBulletArray = [];
  bullets.map(bullet => {
    if (bullet.timer > 0) {
      let { x, y, dir, thrust, vx, vy } = bullet;

      vx = -thrust * Math.cos((dir * Math.PI) / 180);
      vy = -thrust * Math.sin((dir * Math.PI) / 180);
      x += vx;
      y += vy;

      if (y > 1080) y = 0;
      if (y < 0) y = 1080;
      if (x > 1920) x = 0;
      if (x < 0) x = 1920;

      newBulletArray.push({
        x: x,
        y: y,
        dir: dir,
        thrust: thrust,
        vx: vx,
        vy: vy,
        timer: bullet.timer - 10
      })
    }
    return false;
  })
  return newBulletArray
}



export default updateBullet;
