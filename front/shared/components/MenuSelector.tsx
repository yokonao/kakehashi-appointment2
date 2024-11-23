import { Box, Button, Grid2 } from "@mui/material";
import { addDays, format, subDays } from "date-fns";
import useFormElementState from "../../features/form/hooks/useFormElementState";
import { MenuSerializer } from "../../serializers/MenuSerializer";
import { MAX_NUMBER_OF_DAYS_RESERVABLE } from "../const";
import CheckMark from "./CheckMark";
import CustomTextField from "./CustomTextField";
import ErrorMessages from "./ErrorMessages";
import TimeTable from "./TimeTable";
import { memo, useMemo, useState, useCallback, useEffect } from "react";
import { useMediaType } from "../hooks/useMediaType";

type Props = {
  value?: MenuSerializer;
  menus: MenuSerializer[];
  externalErrors?: string[];
  onSelect: (menu?: MenuSerializer) => void;
};

const MenuSelector = memo((props: Props) => {
  const mediaType = useMediaType();
  const { value, menus, onSelect, externalErrors } = props;
  const tomorrow = useMemo(() => addDays(new Date(), 1), []);
  const [baseDate, setBaseDate] = useState<Date>(tomorrow);
  const minDate = useMemo(() => tomorrow, [tomorrow]);
  const maxDate = useMemo(
    () => addDays(tomorrow, MAX_NUMBER_OF_DAYS_RESERVABLE),
    [tomorrow]
  ); // 予約を取れるのは4週間先まで
  const daysPerPage = useMemo(
    () => (mediaType === "mobile" ? 7 : 14),
    [mediaType]
  );
  const enabledPrevButton = useMemo(
    () => baseDate.getTime() > minDate.getTime(),
    [baseDate, minDate]
  );
  const enabledNextButton = useMemo(
    () => addDays(baseDate, daysPerPage).getTime() < maxDate.getTime(),
    [baseDate, daysPerPage, maxDate]
  );
  const toNext = useCallback(
    () => setBaseDate(addDays(baseDate, daysPerPage)),
    [baseDate, setBaseDate, daysPerPage]
  );
  const toPrev = useCallback(
    () => setBaseDate(subDays(baseDate, daysPerPage)),
    [baseDate, setBaseDate, daysPerPage]
  );
  const { state, verify, addErrorMessage, setExternalErrors } =
    useFormElementState();
  useEffect(() => {
    if (externalErrors && externalErrors.length > 0) {
      setExternalErrors(externalErrors);
    }
  }, [externalErrors]);
  return (
    <Box m={mediaType === "mobile" ? 0 : 2}>
      <Box mb={2}>
        <CustomTextField
          value={value ? format(value.start_at, "yyyy年M月d日H時mm分") : ""}
          placeholder="予約日時"
          helperText="下の表から選択してください"
          InputProps={{
            readOnly: true,
            endAdornment: state.isValid && <CheckMark />,
          }}
          error={state.errorMessages.length > 0}
        />
      </Box>
      <ErrorMessages messages={state.errorMessages} />
      {value ? (
        <Button
          onClick={() => {
            onSelect(undefined);
            addErrorMessage("予約日時を選択してください");
          }}
        >
          日時を再度選択する
        </Button>
      ) : (
        <Box>
          <Grid2 container justifyContent="space-between">
            <Button onClick={toPrev} disabled={!enabledPrevButton}>
              前へ
            </Button>
            <Button onClick={toNext} disabled={!enabledNextButton}>
              次へ
            </Button>
          </Grid2>
          <TimeTable
            baseDate={baseDate}
            menus={menus}
            onSelect={(menu: MenuSerializer) => {
              onSelect(menu);
              verify();
            }}
            days={daysPerPage}
          />
        </Box>
      )}
    </Box>
  );
});

export default MenuSelector;
