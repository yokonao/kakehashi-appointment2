import {
  Button,
  Icon,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { addDays, format, startOfWeek } from "date-fns";
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
    border: "solid 0.5px grey",
  },
  header: {
    border: "solid 0.5px grey",
  },
  content: {
    borderLeft: "solid 0.5px grey",
    height: "60px",
  },
  menuCard: {
    background: "#e0d4b7",
    borderRadius: "5px",
    margin: "0px 10px",
    padding: "2px",
    height: "90%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    position: "relative",
    right: "5px",
  },
}));

type Props = {
  menus: MenuAdminSerializer[];
};

const WeeklyMenu = (props: Props) => {
  const { menus } = props;
  const classes = useWeeklyMenuStyles();
  const [baseDate, setBaseDate] = React.useState<Date>(startOfWeek(new Date()));

  return (
    <>
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
                            {format(menu.start_at, "H:mm")} ~{" "}
                            {format(menu.end_at, "H:mm")}
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
    </>
  );
};

export default WeeklyMenu;
