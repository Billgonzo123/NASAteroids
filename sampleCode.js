import { useEffect, useState } from "react";

const App = () => {
    const [asteroidPositions, setAsteroidPositions] = useState({
        0: { x: 0, y: 0 },
        1: { x: 100, y: 100 },
    });
    const [score, setScore] = useState(0);

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    //Loop
    const gravity = () => {
        setTimeout(() => {

            setAsteroidPositions(oldPositions => {
                const clonePositions = { ...oldPositions };
                Object.keys(clonePositions).map((posId, i) => {
                    const pos = clonePositions[posId];
                    pos.y += 10;
                });
                return clonePositions;
            });
            gravity();
        }, 500);
    };

    const clicked = id => {
        setScore(old => old + 1);
        setAsteroidPositions(oldPositions => {
            const clonePositions = { ...oldPositions };
            clonePositions[id] = { x: getRandomInt(1000), y: 0 };
            return clonePositions;
        });
    };

    useEffect(() => gravity(), []);

    return (
        <main style={{ position: "relative" }}>

            Score: {score}points!
            {Object.keys(asteroidPositions).map(posId => {
                const pos = asteroidPositions[posId];
                return pos ? (
                    <div
                        onClick={() => clicked(posId)}
                        key={posId}
                        style={{
                            top: `${pos.y}px`,
                            left: `${pos.x}px`,
                            position: "relative",
                            backgroundColor: "red",
                            width: "20px",
                            height: "20px",
                        }}
                    ></div>
                ) : (
                    ""
                );
            })}
        </main>
    )
