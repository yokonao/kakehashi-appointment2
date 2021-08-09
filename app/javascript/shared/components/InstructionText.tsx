import { Box, Typography } from "@material-ui/core";
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
