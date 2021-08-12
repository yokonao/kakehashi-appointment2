import { Box } from "@material-ui/core";
import * as React from "react";
import CustomTextField from "./CustomTextField";

type Props = {
  value: string;
  onChanged: (value: string) => void;
};

const FreeCommentInput = (props: Props) => {
  const { value, onChanged } = props;
  return (
    <Box m={2}>
      <CustomTextField
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChanged(e.target.value);
        }}
        type="text"
        placeholder="診察前に伝えておきたいことをご自由にお書きください"
        helperText="自由記入欄"
        multiline
        rows={10}
        fullWidth
      />
    </Box>
  );
};

export default FreeCommentInput;
