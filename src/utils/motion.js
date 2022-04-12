

const motion = (x,y,rot) => {
    return {"top": `${y}px`, "left": `${x}px`, "transform": `rotate(${rot - 90}deg)`};
}

export default motion;