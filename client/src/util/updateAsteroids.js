function updateAsteroids(asteroids) {

    let updatedAsteroids = { ...asteroids };

    for (let [key, value] of Object.entries(updatedAsteroids)) {

        if (value.thrust) {
            let { x, y, xB, yB, dir, vx, vy, thrust, spriteDim } = value;
            vx = -thrust * Math.cos((dir) * Math.PI / 180);
            vy = -thrust * Math.sin((dir) * Math.PI / 180);
            //constatley update momentum
            x += vx;
            y += vy;
            //calculate cenetr based of current x,y cord
            let center = { x: x + (spriteDim.w / 2), y: y + (spriteDim.h / 2) }
            //These numbers represent the actual image height and width in pixels


      
            //---------Sprite wrapping----------
            if (y + spriteDim.h > 1080) {
                if (y > 1080) {
                    y = 0;
                    yB = y
                } else {
                    yB = y - 1080;
                }
            } else {
                if (y < 0) {
                    if (y < -spriteDim.h) {
                        y = 1080 - spriteDim.h;
                        yB = y;
                    } else {
                        yB = 1080 + y;
                    }
                } else { yB = y }
            }


            if (x + spriteDim.w > 1920) {
                if (x > 1920) {
                    x = 0;
                    xB = x
                } else {
                    xB = x - 1920;
                }
            } else {
                if (x < 0) {
                    if (x < -spriteDim.w) {
                        x = 1920 - spriteDim.w;
                        xB = x;
                    } else {
                        xB = 1920 + x;
                    }
                } else { xB = x }
            }

            updatedAsteroids[key] = { ...value, x: x, y: y, xB: xB, yB: yB, vx: vx, vy: vy };

        } else {
            updatedAsteroids[key] = {}
        }
    };

    return updatedAsteroids;
}




export default updateAsteroids;

