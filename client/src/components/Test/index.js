import React, { useEffect } from "react";
import {Typography, Grid, Container } from "@mui/material";
import { GET_ME } from "../../util/queries";
import { ADD_LEADERBOARD_HIGHSCORE, ADD_USER_HIGHSCORE } from "../../util/mutations";
import Auth from '../../util/auth';
import { useQuery, useMutation } from "@apollo/client";

const Test = () => {
  const currentScore = 8000987;
  const userScoreDisplay = [
    {score: 50, date: '04/20/22'},
    {score: 100, date: '04/20/22'},
    {score: 200, date: '04/20/22'},
  ];

  const leaderboardData = [
    {score: 50, date: '04/20/22'},
    {score: 100, date: '04/20/22'},
    {score: 200, date: '04/20/22'},
  ];

  const { data, error } = useQuery(GET_ME);
  const [addScore] = useMutation(ADD_USER_HIGHSCORE);

  useEffect(() => {
    
    let userDataScores = data?.me.highscores || [];
    const scores = userDataScores.map((user) => user.score);
    const lowestScore = Math.min(...scores);
    console.log(lowestScore);

    if (currentScore > lowestScore) {  
      try {
        addScore({
          variables: { score: currentScore } 
        });
      } catch (e) {
        throw e
      }

    };

  }, [])



    





  return (


    <Container maxWidth="md">
    <Typography variant="subtitle1" align="center" sx={{mt: 2}}>
      Final Score: {currentScore}
    </Typography>
    <Grid container spacing={4} sx={{ padding: 6, }}>
      <Grid item xs={6} align="center"> 
        Your Highscores:
      </Grid>
      <Grid item xs={6} align="center">
        Leaderboard:
      </Grid>
      <Grid item xs={6} align="center">
        <Grid container spacing={1}>
          {Object.keys(userScoreDisplay).map((index) => {
            const score = userScoreDisplay[index];
            return userScoreDisplay ? (
              <>
                <Grid item xs={12} key={index}>
                  {score.date}....{score.score}
                </Grid>
              </>
            ) : (
              ''
            );
          })}
        </Grid>
      </Grid>
      <Grid item xs={6} align="center">
        <Grid container spacing={1}>
          {leaderboardData.map(({ score, date }) => {
            return leaderboardData ? (
              <>
                <Grid item xs={12} key={score}>
                  {date}....{score}
                </Grid>
              </>
            ) : (
              ''
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  </Container>
  )
};

export default Test;