 //pew pew 🔫
 function generateBullet(player) {
    return {
      dir: player.dir,
      x: player.x + (player.spriteDim.w / 2),
      y: player.y + (player.spriteDim.h / 2),
      vx: 0,
      vy: 0,
      thrust: 30,
      timer: 320
    };
  

  }

  export default generateBullet;