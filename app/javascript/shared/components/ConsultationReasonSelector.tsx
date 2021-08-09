import { Box, Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";
import * as React from "react";

type Props = {
  onChanged: (value: string) => void;
};

type State = { [reason: string]: boolean };

function createInitialState(): State {
  return { 糖尿病: false, 甲状腺: false, その他: false };
}

const ConsultationReasonSelector = (props: Props) => {
  const { onChanged } = props;
  const initialState = React.useMemo(() => createInitialState(), []);
  const [state, setState] = React.useState<State>(initialState);

  return (
    <Box m={2}>
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
                  setState({ ...state, [reason]: e.target.checked });
                  onChanged(
                    Object.entries(state)
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
