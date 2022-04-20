import React, { useEffect } from "react";
import { Typography, Grid, Container } from "@mui/material";
import { GET_ME } from "../../util/queries";
import Profile from "../Profile";
import Leaderboard from "../Leaderboard";
import {
  ADD_LEADERBOARD_HIGHSCORE,
  ADD_USER_HIGHSCORE,
} from "../../util/mutations";
import Auth from "../../util/auth";
import { useQuery, useMutation } from "@apollo/client";

const Test = () => {
  const currentScore = 119999999;
  const userScoreDisplay = [
    { score: 50, date: "04/20/22" },
    { score: 100, date: "04/20/22" },
    { score: 200, date: "04/20/22" },
  ];

  const leaderboardData = [
    { score: 50, date: "04/20/22" },
    { score: 100, date: "04/20/22" },
    { score: 200, date: "04/20/22" },
  ];

  const { loading: loadingUser, data } = useQuery(GET_ME);
  const [addScore] = useMutation(ADD_USER_HIGHSCORE);

  useEffect(() => {
    console.log(loadingUser);
    if (!loadingUser) {
      let userDataScores = data?.me.highscores || [];
      const scores = userDataScores.map((user) => user.score);

      const lowestScore = scores[0] ? Math.min(...scores) : 0;
      console.log(userDataScores);
      console.log("Score: ", scores.sort());
      console.log("Lowest Score: ", lowestScore);

      if (currentScore > lowestScore) {
        console.log("Adding...");
        try {
          addScore({
            variables: { score: currentScore },
          });
        } catch (e) {
          throw e;
        }
      }
    }
  }, [loadingUser]);

  return (
    <Container maxWidth="md">
      <Typography variant="subtitle1" align="center" sx={{ mt: 2 }}>
        Final Score: {currentScore}
      </Typography>
      <Grid container spacing={4} sx={{ padding: 6 }}>
        <Grid item xs={6} align="center">
          <Profile />
        </Grid>
        <Grid item xs={6} align="center">
          <Leaderboard />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Test;
