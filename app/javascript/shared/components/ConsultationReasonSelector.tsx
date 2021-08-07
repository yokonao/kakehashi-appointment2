import { Box, Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";
import * as React from "react";

type Props = {
  value: string[];
  onChanged: (value: string[]) => void;
};

const reasonList: string[] = ["糖尿病", "脂質異常症", "高血圧", "甲状腺"];

type State = { [reason: string]: boolean };

function createInitialState(): State {
  return { 糖尿病: false, 脂質異常症: false, 高血圧: false, 甲状腺: false };
}

const ConsultationReasonSelector = (props: Props) => {
  const { value, onChanged } = props;
  const [state, setState] = React.useState<State>(createInitialState());
  return (
    <Box m={2}>
      <FormGroup>
        {reasonList.map((reason) => (
          <FormControlLabel
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
