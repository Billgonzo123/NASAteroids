import * as React from "react";
import { Box} from "@mui/material";
import HudHeader from "../../components/HudHeader"
import HudFooter from "../../components/HudFooter"

export default function Hud({gameState, setGameState}) {
  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '75vh',
        position: 'relative',
        top: '0px',
        left: '0px'
      }}>
        <HudHeader gameState={gameState} setGameState={setGameState} />
        <HudFooter />
    </Box>
  );
}
