
    const getDistatce = (xa, xb, ya, yb) => {
    const a = xa - xb;
    const b = ya - yb;
    return Math.sqrt((a * a) + (b * b));
    }

    export default getDistatce;