import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import * as React from "react";
import { useHistory } from "react-router-dom";

const DepartmentChoice = () => {
  const history = useHistory();
  return (
    <>
      <Container maxWidth="xs" style={{ backgroundColor: "white" }}>
        <Box py={2} my={2} textAlign="center">
          <Typography variant="h4" color="primary">
            診療科を選択
          </Typography>
        </Box>
        <Typography>翌日〜２週後までの予約が可能です</Typography>
        <Grid
          container
          spacing={1}
          style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
        >
          <Grid item xs={6}>
            <Button
              color="primary"
              variant="outlined"
              fullWidth
              size="large"
              onClick={() => history.push("/form/internal_medicine")}
            >
              内科
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              color="primary"
              variant="outlined"
              fullWidth
              size="large"
              onClick={() => history.push("/form/kampo")}
            >
              漢方
            </Button>
          </Grid>
        </Grid>
      </Container>
      <div style={{ height: "400px" }} />
    </>
  );
};

export default DepartmentChoice;
