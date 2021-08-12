import { Box, Grid, Icon, InputAdornment, TextField } from "@material-ui/core";
import * as React from "react";
import useFormElementState from "../../features/hooks/useFormElementState";
import CheckMark from "./CheckMark";
import ErrorMessages from "./ErrorMessages";

type Props = {
  value: string;
  onChanged: (fullKanaName: string) => void;
  externalErrors?: string[];
};

function validateKana(target: string) {
  return target.length > 0 && /^[ァ-ヶー－ |　|]+$/.test(target);
}

const PersonKanaNameInput = (props: Props) => {
  const { value, onChanged, externalErrors } = props;
  const { state, verify, addErrorMessage, setExternalErrors } =
    useFormElementState();
  const validate = React.useCallback(() => {
    if (validateKana(value)) {
      verify();
    } else if (value.length == 0) {
      addErrorMessage("氏名をカタカナで入力してください");
    } else {
      addErrorMessage("カタカナで入力してください");
    }
  }, [value, verify, addErrorMessage]);
  React.useEffect(() => {
    if (externalErrors && externalErrors.length > 0) {
      setExternalErrors(externalErrors);
    }
  }, [externalErrors]);

  return (
    <Box m={2}>
      <Grid container spacing={3}>
        <Grid item>
          <TextField
            required
            id="full_kana_name"
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onChanged(e.target.value);
            }}
            onBlur={() => {
              validate();
            }}
            inputProps={{ maxLength: 50 }}
            placeholder="カケハシ　ハナコ"
            helperText="セイ（カタカナ）"
            variant="outlined"
            InputProps={{
              endAdornment: state.isValid && <CheckMark />,
            }}
            error={state.errorMessages.length > 0}
          />
        </Grid>
      </Grid>
      <ErrorMessages messages={state.errorMessages} />
    </Box>
  );
};

export default PersonKanaNameInput;
