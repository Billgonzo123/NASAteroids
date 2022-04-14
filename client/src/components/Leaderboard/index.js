import * as React from "react";
import {  Card, CardContent, Typography,} from "@mui/material";
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
    </Card>
  );
}
