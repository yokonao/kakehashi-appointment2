import * as React from "react";
import { Button, TextField } from "@material-ui/core";

const Form = () => (
  <div>
    <div>
      <TextField required id="last_name" label="姓" variant="outlined" />
      <TextField required id="first_name" label="名" variant="outlined" />
    </div>
    <div>
      <TextField id="last_kana_name" label="セイ" variant="outlined" />
      <TextField id="first_kana_name" label="メイ" variant="outlined" />
    </div>
    <Button variant="contained" color="primary">
      予約
    </Button>
  </div>
);

export default Form;
