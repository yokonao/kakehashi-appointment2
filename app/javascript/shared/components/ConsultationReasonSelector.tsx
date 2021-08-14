import { Box, Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";
import * as React from "react";
import useFormElementState from "../../features/form/hooks/useFormElementState";
import ErrorMessages from "./ErrorMessages";

type Props = {
  onChanged: (value: string) => void;
  externalErrors?: string[];
};

type State = { [reason: string]: boolean };

function createInitialState(): State {
  return { 糖尿病: false, 甲状腺: false, その他: false };
}

const ConsultationReasonSelector = (props: Props) => {
  const { onChanged, externalErrors } = props;
  const initialState = React.useMemo(() => createInitialState(), []);
  const [state, setState] = React.useState<State>(initialState);
  const {
    state: { errorMessages },
    setExternalErrors,
  } = useFormElementState();
  React.useEffect(() => {
    if (externalErrors && externalErrors.length > 0) {
      setExternalErrors(externalErrors);
    }
  }, [externalErrors]);
  return (
    <Box m={2}>
      <ErrorMessages messages={errorMessages} />
      <FormGroup>
        {Object.entries(initialState).map(([reason, _]) => (
          <FormControlLabel
            key={reason}
            control={
              <Checkbox
                color="primary"
                value={reason}
                checked={state[reason]}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const newState = { ...state, [reason]: e.target.checked };
                  setState(newState);
                  setExternalErrors([]);
                  onChanged(
                    Object.entries(newState)
                      .map(([key, value]) => ({ key, value }))
                      .filter((e) => e.value)
                      .map((e) => e.key)
                      .join(",")
                  );
                }}
              />
            }
            label={reason}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default ConsultationReasonSelector;
