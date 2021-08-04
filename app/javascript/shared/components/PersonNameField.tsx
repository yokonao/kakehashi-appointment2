import { Box, TextField } from "@material-ui/core";
import * as React from "react";
import { PersonName } from "../../domain/PersonName";

type Props = {
  value: PersonName;
  onChanged: (personName: PersonName) => void;
};

const PersonNameField = (props: Props) => {
  const { value, onChanged } = props;
  return (
    <Box m={2}>
      <Box>
        <TextField
          required
          id="last_name"
          value={value.lastName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue: PersonName = {
              ...value,
              lastName: e.target.value,
            };
            onChanged(newValue);
          }}
          label="姓"
          variant="outlined"
        />
        <TextField
          required
          id="first_name"
          value={value.firstName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue: PersonName = {
              ...value,
              firstName: e.target.value,
            };
            onChanged(newValue);
          }}
          label="名"
          variant="outlined"
        />
      </Box>
      <Box>
        <TextField
          required
          id="last_kana_name"
          value={value.lastKanaName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue: PersonName = {
              ...value,
              lastKanaName: e.target.value,
            };
            onChanged(newValue);
          }}
          label="セイ"
          variant="outlined"
        />
        <TextField
          required
          id="first_kana_name"
          value={value.firstKanaName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue: PersonName = {
              ...value,
              firstKanaName: e.target.value,
            };
            onChanged(newValue);
          }}
          label="姓"
          variant="outlined"
        />
      </Box>
    </Box>
  );
};

export default PersonNameField;
