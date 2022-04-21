import { playSound, stopSound } from "../playSound";

function updatePlayer(globalPlayer, keysPressed) {
    let { x, y, xB, yB, dir, thrust, vx, vy, turnSpeed, spriteDim, alive, invnsTimer, pressW } = globalPlayer;
    if (invnsTimer > 0) invnsTimer--;

    //if 'w' key opressed, add velocity in direction

    if (keysPressed.includes('w')) {
        pressW = true;
        if (globalPlayer.alive) playSound('engine_snd')
        vx -= thrust * Math.cos((dir) * Math.PI / 180);
        vy -= thrust * Math.sin((dir) * Math.PI / 180);
    } else {
        stopSound('engine_snd');
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

    //Sprite wrapping --- 
    if (y > 980) y = 0;
    if (y < 0) y = 980;
    if (x > 1920) x = 0;
    if (x < 0) x = 1920;
    xB=x; if (xB+spriteDim.w>1920) xB -=1920;
    yB=y; if (yB+spriteDim.h>980) yB -=980;

    return { ...globalPlayer, x, y, xB, yB, dir, thrust, vx, vy, turnSpeed, spriteDim, alive, invnsTimer, pressW }
}

export default updatePlayer;