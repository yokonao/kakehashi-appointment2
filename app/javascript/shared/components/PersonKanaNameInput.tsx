import { Box, Grid, Icon, InputAdornment, TextField } from "@material-ui/core";
import * as React from "react";
import { PersonKanaName } from "../../domain/PersonKanaName";
import useFormElementState from "../../features/hooks/useFormElementState";
import CheckMark from "./CheckMark";
import ErrorMessages from "./ErrorMessages";

type Props = {
  value: PersonKanaName;
  onChanged: (personName: PersonKanaName) => void;
  externalErrors: string[];
};

function validateKana(target: string) {
  return target.length > 0 && /^[ァ-ヶー－]+$/.test(target);
}

const PersonKanaNameInput = (props: Props) => {
  const { value, onChanged, externalErrors } = props;
  const { state, verify, addErrorMessage, setExternalErrors } =
    useFormElementState();
  const validate = React.useCallback(() => {
    if (validateKana(value.firstKanaName) && validateKana(value.lastKanaName)) {
      verify();
    } else if (
      value.firstKanaName.length == 0 ||
      value.lastKanaName.length == 0
    ) {
      addErrorMessage("氏名をカタカナで入力してください");
    } else {
      addErrorMessage("カタカナで入力してください");
    }
  }, [value.firstKanaName, value.lastKanaName, verify, addErrorMessage]);
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
            id="last_kana_name"
            value={value.lastKanaName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const newValue: PersonKanaName = {
                ...value,
                lastKanaName: e.target.value,
              };
              onChanged(newValue);
            }}
            onBlur={() => {
              if (value.firstKanaName.length > 0) validate();
            }}
            inputProps={{ maxLength: 20 }}
            placeholder="カケハシ"
            helperText="セイ（カタカナ）"
            variant="outlined"
            InputProps={{
              endAdornment: state.isValid && <CheckMark />,
            }}
            error={state.errorMessages.length > 0}
          />
        </Grid>
        <Grid item>
          <TextField
            required
            id="first_kana_name"
            value={value.firstKanaName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const newValue: PersonKanaName = {
                ...value,
                firstKanaName: e.target.value,
              };
              onChanged(newValue);
            }}
            onBlur={() => {
              validate();
            }}
            inputProps={{ maxLength: 20 }}
            placeholder="ハナコ"
            helperText="メイ（カタカナ）"
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
