import * as React from "react";
import {  Card,  CardActions,  CardContent,  Typography,} from "@mui/material";
import LeaderboardTable from "../../components/LeaderboardTable";

export default function BasicCard() {
  return (
    <Card sx={{ minWidth: 275, backgroundColor: "transparent" }}>
      <CardContent>
        <Typography align="center" gutterBottom>
          Leaderboard
        </Typography>
        <LeaderboardTable />
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between"}}>
        <button type="button" className="nes-btn upperCase">
          Login
        </button>
        <button type="button" className="nes-btn upperCase">
          Signup
        </button>
      </CardActions>
    </Card>
  );
}
