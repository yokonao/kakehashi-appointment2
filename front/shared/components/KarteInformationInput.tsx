import { Box, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { KarteInformation } from "../../domain/KarteInformation";
import useFormElementState from "../../features/form/hooks/useFormElementState";
import CheckMark from "./CheckMark";
import CustomTextField from "./CustomTextField";
import ErrorMessages from "./ErrorMessages";
import { useCallback, useEffect } from "react";

type Props = {
  value: KarteInformation;
  onChanged: (value: KarteInformation) => void;
  externalErrors?: string[];
};

const KarteInformationInput = (props: Props) => {
  const { value, onChanged, externalErrors } = props;
  const handleRadioChange = (newValue: string) => {
    if (newValue === "yes") {
      onChanged({ ...value, isFirstVisit: true });
    } else {
      onChanged({ ...value, isFirstVisit: false });
    }
  };
  const { state, verify, addErrorMessage, setExternalErrors } =
    useFormElementState();
  const validate = useCallback(() => {
    if (!value.isFirstVisit) {
      if (
        value.clinicalNumber.length > 0 &&
        !/^[0-9]{5}$/.test(value.clinicalNumber)
      ) {
        // 診察券番号が入力済みで数字5ケタでない場合はエラー
        addErrorMessage("診察券番号は数字5ケタで入力してください");
        return;
      }
    }
    verify();
  }, [value.isFirstVisit, value.clinicalNumber, verify, addErrorMessage]);
  useEffect(() => {
    if (externalErrors && externalErrors.length > 0) {
      setExternalErrors(externalErrors);
    }
  }, [externalErrors]);
  return (
    <Box m={2}>
      <RadioGroup
        name="whether_first_visit"
        value={value.isFirstVisit ? "yes" : "no"}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleRadioChange(e.target.value)
        }
      >
        <FormControlLabel
          value="yes"
          control={<Radio color="primary" data-testid="is-first-visit-true" />}
          label="はい"
        />
        <FormControlLabel
          value="no"
          control={<Radio color="primary" data-testid="is-first-visit-false" />}
          label="いいえ"
        />
      </RadioGroup>
      {!value.isFirstVisit && (
        <>
          <CustomTextField
            id="clinical-number"
            value={value.clinicalNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onChanged({ ...value, clinicalNumber: e.target.value });
            }}
            onBlur={() => validate()}
            type="tel"
            placeholder="00028"
            helperText="再診の方は診察券番号を入力してください"
            inputProps={{ maxLength: 5 }}
            InputProps={{
              endAdornment: state.isValid && <CheckMark />,
            }}
            error={state.errorMessages.length > 0}
          />
          <ErrorMessages messages={state.errorMessages} />
        </>
      )}
    </Box>
  );
};

export default KarteInformationInput;
