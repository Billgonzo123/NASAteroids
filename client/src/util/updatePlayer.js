import { playSound, stopSound } from "./playSound";

function updatePlayer(globalPlayer, keysPressed) {
    let { x, y, xB, yB, dir, thrust, vx, vy, turnSpeed, spriteDim, alive, invnsTimer, pressW } = globalPlayer;
    if (invnsTimer > 0) invnsTimer--;
    (keysPressed.includes("w") && globalPlayer.alive) ? playSound('engine_snd') : stopSound('engine_snd');
    //if 'w' key opressed, add velocity in direction
    
    if (keysPressed.includes('w')) {
        pressW = true;
        vx -= thrust * Math.cos((dir) * Math.PI / 180);
        vy -= thrust * Math.sin((dir) * Math.PI / 180);
    } else {
        pressW = false;
    }
    //Rotate ship whe A or D pressed
    if (keysPressed.includes('d')) {
        (dir < 360) ? dir += turnSpeed : dir = 0;
    }
    if (keysPressed.includes('a')) {
        (dir <= 0) ? dir = 360 : dir -= turnSpeed;
    }
    //constatley update momentum
    x += vx;
    y += vy;

//Sprite wrapping --- make this code a seperate function
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
                yB =1080 + y;
            }
        } else { yB = y }
    }


    if (x + spriteDim.w > 1920) {
        if (x > 1920) {
            x = 0;
            xB = x
        } else {
            xB = x - 1920;
            yB = y 
        }
    } else {
        if (x < 0) {
            if (x < -spriteDim.w) {
                x = 1920 - spriteDim.w;
                xB = x;
            } else {
                xB =1920 + x;
            }
        } else { xB = x }
    }

    return { ...globalPlayer, x, y, xB, yB, dir, thrust, vx, vy, turnSpeed, spriteDim, alive, invnsTimer, pressW }
}

export default updatePlayer;