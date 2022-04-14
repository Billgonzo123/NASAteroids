import * as React from "react";
import { Card, CardContent, CardActions, Typography} from "@mui/material";
import LeaderboardTable from "../../components/LeaderboardTable";

export default function BasicCard() {
  return (
    <Card sx={{ minWidth: 350, backgroundColor: "transparent" }}>
      <CardContent>
        <Typography align="center" gutterBottom>
          Leaderboard
        </Typography>
        <LeaderboardTable />
        <CardActions
            sx={{
              justifyContent: "space-between",
              backgroundColor: "transparent",
              mt: 10,
            }}
          >
            <button type="button" className="nes-btn upperCase">
              Login
            </button>
            <button type="button" className="nes-btn upperCase">
              Signup
            </button>
          </CardActions>
      </CardContent>
    </Card>
  );
}
