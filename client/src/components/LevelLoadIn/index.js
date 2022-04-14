import * as React from "react";
import {  Card,  CardContent,  Typography,} from "@mui/material";
import LeaderboardTable from "../../components/LeaderboardTable";

export default function BasicCard() {
  return (
    <Card sx={{ minWidth: 275, backgroundColor: "transparent" }}>
      <CardContent>
        <Typography variant="h1" align="center" gutterBottom>
          Level One
        </Typography>
        <progress class="nes-progress is-pattern" value="50" max="100"></progress>
        <LeaderboardTable />
      </CardContent>
    </Card>
  );
}
