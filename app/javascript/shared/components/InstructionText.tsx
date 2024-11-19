import { Box, Typography } from "@mui/material";
import * as React from "react";

type Props = {
  text: string;
};

const InstructionText = (props: Props) => {
  const { text } = props;
  return (
    <Box py={2} my={2} fontWeight={500}>
      <Typography color="inherit">{text}</Typography>
    </Box>
  );
};

export default InstructionText;
