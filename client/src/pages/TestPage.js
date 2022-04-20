import React from "react";
import Test from "../components/Test";

const TestPage = ({gameState, setGameState}) => {
  return (

    <Test
    setGameState={setGameState}
    gameState={gameState}
    >

    </Test>
  )
};

export default TestPage;