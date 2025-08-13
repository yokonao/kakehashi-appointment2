import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DepartmentChoice = () => {
  const navigate = useNavigate();
  return (
    <>
      <Container maxWidth="xs" style={{ backgroundColor: "white" }}>
        <Box py={2} my={2} textAlign="center">
          <Typography variant="h4" color="primary">
            診療科を選択
          </Typography>
        </Box>
        <Box textAlign="center">
          <Typography>翌日〜4週後までの予約が可能です</Typography>
        </Box>
        <Grid
          container
          spacing={1}
          style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
        >
          <Grid size={{ xs: 6 }}>
            <div
              style={{
                display: "flex",
                flexFlow: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                color="primary"
                variant="outlined"
                fullWidth
                size="large"
                onClick={() => navigate("/form/internal_medicine")}
              >
                内科
              </Button>
              <span style={{ fontSize: "14px" }}>（木曜・日曜は休診）</span>
            </div>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <div
              style={{
                display: "flex",
                flexFlow: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                color="primary"
                variant="outlined"
                fullWidth
                size="large"
                onClick={() => navigate("/form/kampo")}
                disabled
              >
                漢方
              </Button>
              {/* <span style={{ fontSize: "14px" }}>（木曜午前のみ診療）</span> */}
            </div>
          </Grid>
        </Grid>
        <Grid style={{ paddingBottom: "2rem" }}>
          <Typography>* 漢方のWEB予約は現在休止中です</Typography>
          <Typography>
            * <b>発熱や風邪症状</b>がある方、および<b>コロナ検査</b>
            を希望される方は直接お電話ください
          </Typography>
        </Grid>
      </Container>
      <div style={{ height: "400px" }} />
    </>
  );
};

export default DepartmentChoice;
