import * as React from "react";
import { Card, CardContent, Typography} from "@mui/material";
import LeaderboardTable from "../../components/LeaderboardTable";

export default function Leaderboard() {
  return (
    <Card sx={{ minWidth: 350, backgroundColor: "transparent" }}>
      <CardContent>
        <Typography align="center" sx={{mb: 2}} gutterBottom>
          Leaderboard
        </Typography>
        {/* Import Leaderboard Data Table */}
        <LeaderboardTable />
      </CardContent>
    </Card>
  );
}
