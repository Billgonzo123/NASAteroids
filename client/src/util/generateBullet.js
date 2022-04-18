 //pew pew 🔫
 function generateBullet(player, setBullets) {
    const bulletObj = {
      dir: player.dir,
      x: player.x + (player.spriteDim.w / 2),
      y: player.y + (player.spriteDim.h / 2),
      vx: 0,
      vy: 0,
      thrust: 30,
      timer: 300
    };

    // const newBulletObj = updateBullet(bulletObj);

    // //need to cap at 5
    setBullets((old) => ([...old, bulletObj]));

  }

  export default generateBullet;