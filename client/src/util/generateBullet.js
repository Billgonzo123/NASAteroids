 //pew pew 🔫
 function generateBullet(player) {
    return {
      dir: player.dir,
      x: player.x + (player.spriteDim.w / 2),
      y: player.y + (player.spriteDim.h / 2),
      vx: -30 * Math.cos((player.dir * Math.PI) / 180),
      vy: -30 * Math.sin((player.dir * Math.PI) / 180),
      thrust: 30,
      timer: 250
    };
  

  }

  export default generateBullet;