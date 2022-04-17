import * as React from "react";
import { Box} from "@mui/material";
import HudHeader from "../../components/HudHeader"
import HudFooter from "../../components/HudFooter"

export default function Hud() {
  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '90vh',
      }}>
        <HudHeader />
        <HudFooter />
    </Box>
    
  );
}
