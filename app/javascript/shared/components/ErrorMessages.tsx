import { Box, Icon } from "@mui/material";
import * as React from "react";

type Props = {
  messages: string[];
};

const ErrorMessages = (props: Props) => {
  const { messages } = props;
  return (
    <Box>
      {messages.map((e) => {
        return (
          <Box
            key={"error-message-" + e}
            color="red"
            display="flex"
            alignItems="center"
          >
            <Icon>error</Icon>
            <span> {e}</span>
          </Box>
        );
      })}
    </Box>
  );
};

export default ErrorMessages;
