import { Box, TextField } from "@mui/material";

type Props = {
  value: string;
  onChanged: (value: string) => void;
};

const FreeCommentInput = (props: Props) => {
  const { value, onChanged } = props;
  return (
    <Box m={2}>
      <TextField
        id="free-comment"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChanged(e.target.value);
        }}
        type="text"
        placeholder="診察前に伝えておきたいことをご自由にお書きください"
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
