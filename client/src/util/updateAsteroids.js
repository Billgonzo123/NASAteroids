function updateAsteroids(asteroids, currentLevel) {

    let updatedAsteroids = { ...asteroids };
    
    Object.keys(updatedAsteroids).map((key) =>{
        const value = updatedAsteroids[key];
        if (value.alive) {
            let { x, y, xB, yB, vx, vy, thrust, spriteDim } = value;
            thrust = thrust + currentLevel/8; 
            //constatley update momentum
            x += vx*thrust;
            y += vy*thrust;
            
          
            //---------Sprite wrapping----------
            if (y > 980) y = 0;
            if (y < 0) y = 980;
            if (x > 1920) x = 0;
            if (x < 0) x = 1920;
            xB=x; if (xB+spriteDim.w>1920) xB -=1920;
            yB=y; if (yB+spriteDim.h>980) yB -=980;

            updatedAsteroids[key] = { ...value, x: x, y: y, xB: xB, yB: yB, vx: vx, vy: vy };
        } 
        return false;
    });
    return updatedAsteroids;
}




export default updateAsteroids;

