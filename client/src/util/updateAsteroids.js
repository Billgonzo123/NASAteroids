function updateAsteroids(asteroids, currentLevel) {

    let updatedAsteroids = { ...asteroids };
    
    Object.keys(updatedAsteroids).map((key) =>{
        const value = updatedAsteroids[key];
        if (value.alive) {
            let { x, y, xB, yB, vx, vy, thrust, spriteDim } = value;
            thrust = thrust + currentLevel/4; 
            //constatley update momentum
            x += vx*thrust;
            y += vy*thrust;
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
        } 
        return false;
    });
    return updatedAsteroids;
}




export default updateAsteroids;

