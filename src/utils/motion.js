 /*
   NOTES ABOUT ROTATION:
   math.cos and Math.sin consider a RIGHT to be 0 deg, where  "transform: rotate()" in CSS considers UP to be 0 degrees
   We have to compensate for this by subtracting 90 from the players direction.
   This works because "transform: rotate()" will acept negative numbers where sin and cos cannot take negative numbers
 */

const motion = (x,y,rot) => {
    return {"top": `${y}px`, "left": `${x}px`, "transform": `rotate(${rot - 90}deg)`};
}

export default motion;