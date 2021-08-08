import { Box, TextField } from "@material-ui/core";
import * as React from "react";

type Props = {
  value: string;
  onChanged: (value: string) => void;
};

const FreeCommentInput = (props: Props) => {
  const { value, onChanged } = props;
  return (
    <Box m={2}>
      <TextField
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChanged(e.target.value);
        }}
        type="text"
        placeholder="医師に伝えたいことを自由にお書きください"
        helperText="自由記入欄"
        variant="outlined"
        multiline
        rows={10}
        fullWidth
      />
    </Box>
  );
};

export default FreeCommentInput;
