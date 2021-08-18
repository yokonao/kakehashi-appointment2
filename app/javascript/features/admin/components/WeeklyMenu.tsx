import {
  Box,
  Button,
  Grid,
  Icon,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { addDays, addWeeks, format, startOfWeek, subWeeks } from "date-fns";
import { ja } from "date-fns/locale";
import * as React from "react";
import {
  createBusinessTimesEveryThirtyMinutes,
  createDaysOnTheTime,
} from "../../../domain/BusinessRule";
import { MenuAdminSerializer } from "../../../serializers/MenuAdminSerializer";

const useWeeklyMenuStyles = makeStyles((theme) => ({
  table: {
    tableLayout: "fixed",
    borderSpacing: 0,
    borderCollapse: "collapse",
    width: "100%",
    border: "solid 0.5px rgba(224, 224, 224, 1)",
  },
  header: {
    border: "solid 0.5px rgba(224, 224, 224, 1)",
  },
  content: {
    borderLeft: "solid 0.5px rgba(224, 224, 224, 1)",
    height: "60px",
  },
  menuCard: {
    background: theme.palette.primary.light,
    borderRadius: "5px",
    margin: "0px 10px",
    padding: "10px",
    height: "90%",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    color: "white",
    fontSize: "20px",
  },
  deleteButton: {
    marginLeft: "5px",
  },
}));

type Props = {
  menus: MenuAdminSerializer[];
};

const WeeklyMenu = (props: Props) => {
  const { menus } = props;
  const classes = useWeeklyMenuStyles();
  const [baseDate, setBaseDate] = React.useState<Date>(startOfWeek(new Date()));
  const toPrev = React.useCallback(() => {
    setBaseDate(subWeeks(baseDate, 1));
  }, [baseDate, setBaseDate]);
  const toNext = React.useCallback(() => {
    setBaseDate(addWeeks(baseDate, 1));
  }, [baseDate, setBaseDate]);

  return (
    <Box mr={10} mt={2}>
      <Box display="flex" alignItems="center">
        <IconButton color={"default"} onClick={toPrev}>
          <Icon>arrow_back</Icon>
        </IconButton>
        <Typography>{format(baseDate, "yyyy/MM/dd")}</Typography>
        <IconButton color={"default"} onClick={toNext}>
          <Icon>arrow_forward</Icon>
        </IconButton>
      </Box>
      <table className={classes.table}>
        <thead>
          <tr>
            {[0, 1, 2, 3, 4, 5, 6].map((e) => {
              return (
                <th key={"weekly-menu-header-" + e} className={classes.header}>
                  <span>
                    {format(addDays(baseDate, e), "M/dd（E）", { locale: ja })}
                  </span>
                  <Button color="secondary">一括削除</Button>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {createBusinessTimesEveryThirtyMinutes(baseDate).map((e) => {
            return (
              <tr key={"weekly-menu-row-" + e.toString()}>
                {createDaysOnTheTime(e, 6).map((date) => {
                  const menu = menus.find(
                    (menu) => menu.start_at.getTime() === date.getTime()
                  );
                  return (
                    <td
                      className={classes.content}
                      key={"weekly-menu-content-" + date.toString()}
                    >
                      {menu ? (
                        <div className={classes.menuCard}>
                          <span>
                            {`${format(menu.start_at, "HH:mm")} 〜
                            ${format(menu.end_at, "HH:mm")}`}
                          </span>
                          <IconButton
                            className={classes.deleteButton}
                            color={"default"}
                            size="small"
                          >
                            <Icon>delete</Icon>
                          </IconButton>
                        </div>
                      ) : (
                        <></>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Box>
  );
};

export default WeeklyMenu;
