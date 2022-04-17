import getDistatce from "./getDistance";

const rndAstPos = (plPos) => {
    const { x, y, xB, yB, spriteDim } = plPos;

    const centerA = { x: x + (spriteDim.w / 2), y: y + (spriteDim.h / 2) }
    const centerB = { x: xB + (spriteDim.w / 2), y: yB + (spriteDim.h / 2) }

    let setX = Math.floor(Math.random() * 1920);
    let setY = Math.floor(Math.random() * 1080);

    let distA = getDistatce(centerA.x, setX, centerA.y,setY);
    let distB = getDistatce(centerB.x, setX, centerB.y,setY);

    while (distA<550 && distB<550) {
        setX = Math.floor(Math.random() * 1920);
        setY = Math.floor(Math.random() * 1080);
        distA = getDistatce(centerA.x, setX, centerA.y,setY);
        distB = getDistatce(centerA.x, setX, centerA.y,setY);
    }

    return { x: setX, y: setY }
};


export default rndAstPos;


