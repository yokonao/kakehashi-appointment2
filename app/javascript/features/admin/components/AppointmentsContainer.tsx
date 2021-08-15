import DateFnsUtils from "@date-io/date-fns";
import {
  Calendar,
  DatePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import * as React from "react";
import { useAdminContext } from "../hooks/useAdminContext";
import Appointments from "./Appointments";
import jaLocale from "date-fns/locale/ja";
import CustomTextField from "../../../shared/components/CustomTextField";
import { Box, TextField, Typography } from "@material-ui/core";

type DisplayCondition = {
  minDate: Date | null;
  maxDate: Date | null;
};

const AppointmentsContainer = () => {
  const { appointments, menus } = useAdminContext();
  const [displayCondition, setDisplayCondition] =
    React.useState<DisplayCondition>({ minDate: null, maxDate: null });
  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jaLocale}>
        <Box display="flex" alignItems="center">
          <DatePicker
            inputVariant="outlined"
            size="small"
            variant="inline"
            invalidLabel=""
            value={displayCondition.minDate}
            onChange={(date: Date) => {
              setDisplayCondition({ ...displayCondition, minDate: date });
            }}
            clearable
            autoOk
            minDate={new Date("2021-07-02")}
            maxDate={
              displayCondition.maxDate === null
                ? undefined
                : displayCondition.maxDate
            }
          />
          <span> から </span>
          <DatePicker
            inputVariant="outlined"
            size="small"
            variant="inline"
            invalidLabel=""
            value={displayCondition.maxDate}
            onChange={(date: Date) => {
              setDisplayCondition({ ...displayCondition, maxDate: date });
            }}
            clearable
            autoOk
            minDate={
              displayCondition.minDate === null
                ? new Date("2021-07-02")
                : displayCondition.minDate
            }
          />
          <span>まで</span>
        </Box>
      </MuiPickersUtilsProvider>
      <Appointments appointments={appointments} menus={menus} />
    </>
  );
};

export default AppointmentsContainer;
