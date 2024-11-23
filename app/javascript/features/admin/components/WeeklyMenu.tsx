import {
  Box,
  Button,
  Icon,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import { addDays, addWeeks, format, startOfWeek, subWeeks } from "date-fns";
import { ja } from "date-fns/locale";
import {
  createBusinessTimesEveryThirtyMinutes,
  createDaysOnTheTime,
} from "../../../domain/BusinessRule";
import { MenuAdminSerializer } from "../../../serializers/MenuAdminSerializer";
import { useNotification } from "../../form/hooks/useNotification";
import { AdminApiClient } from "../api/AdminApiClient";
import { useAdminContext } from "../hooks/useAdminContext";
import AppointmentDetailDialog from "./AppointmentDetailDialog";
import CreateMenuConfirmationDialog from "./CreateMenuConfirmationDialog";
import DeleteAllDayMenusConfirmationDialog from "./DeleteAllDayMenusConfirmationDialog";
import DeleteMenuConfirmationDialog from "./DeleteMenuConfirmationDialog";
import { useState, useCallback } from "react";

const StyledTable = styled("table")(() => ({
  tableLayout: "fixed",
  borderSpacing: 0,
  borderCollapse: "collapse",
  width: "100%",
  border: "solid 0.5px rgba(224, 224, 224, 1)",
}));

const StyleTableHeader = styled("th")(() => ({
  border: "solid 0.5px rgba(224, 224, 224, 1)",
}));

const StyledTableContent = styled("td")(() => ({
  borderLeft: "solid 0.5px rgba(224, 224, 224, 1)",
  height: "40px",
}));

const StyledMenuCard = styled("div")(() => ({
  borderRadius: "5px",
  margin: "0px 10px",
  padding: "10px",
  height: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

type Props = {
  menus: MenuAdminSerializer[];
};

const WeeklyMenu = (props: Props) => {
  const { menus } = props;
  const { addInfo } = useNotification();
  const { fetchData } = useAdminContext();
  const [baseDate, setBaseDate] = useState<Date>(startOfWeek(new Date()));
  const toPrev = useCallback(() => {
    setBaseDate(subWeeks(baseDate, 1));
  }, [baseDate, setBaseDate]);
  const toNext = useCallback(() => {
    setBaseDate(addWeeks(baseDate, 1));
  }, [baseDate, setBaseDate]);
  const [selectedAppointmentId, setSelectedAppointmentId] =
    useState<number>(-1);
  const [menuToDelete, setMenuToDelete] = useState<
    MenuAdminSerializer | undefined
  >(undefined);
  const [dateToDelete, setDateToDelete] = useState<Date | undefined>(undefined);
  const [dateToCreate, setDateToCreate] = useState<Date | undefined>(undefined);

  return (
    <Box mt={2}>
      <Box display="flex" alignItems="center">
        <IconButton color={"default"} onClick={toPrev}>
          <Icon>arrow_back</Icon>
        </IconButton>
        <Typography>{format(baseDate, "yyyy/MM/dd")}</Typography>
        <IconButton color={"default"} onClick={toNext}>
          <Icon>arrow_forward</Icon>
        </IconButton>
      </Box>
      <StyledTable>
        <thead>
          <tr>
            {[0, 1, 2, 3, 4, 5, 6].map((e) => {
              const date = addDays(baseDate, e);
              return (
                <StyleTableHeader key={"weekly-menu-header-" + e}>
                  <span>{format(date, "M/dd（E）", { locale: ja })}</span>
                  <Button
                    color="secondary"
                    variant="outlined"
                    onClick={() => setDateToDelete(date)}
                  >
                    全削除
                  </Button>
                </StyleTableHeader>
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
                    <StyledTableContent
                      key={"weekly-menu-content-" + date.toString()}
                    >
                      {menu ? (
                        <StyledMenuCard
                          style={{
                            backgroundColor: menu.appointment_id
                              ? "#ffa899"
                              : menu.department === "漢方"
                              ? "#fffacd"
                              : "#b0c4de",
                          }}
                        >
                          {menu.appointment_id ? (
                            <>
                              <span>{`１名 ${format(
                                menu.start_at,
                                "HH:mm"
                              )}`}</span>
                              <IconButton
                                color={"default"}
                                size="small"
                                onClick={() =>
                                  setSelectedAppointmentId(menu.appointment_id)
                                }
                                sx={{ marginLeft: "5px" }}
                              >
                                <Icon>description</Icon>
                              </IconButton>
                            </>
                          ) : (
                            <>
                              <span>
                                {`${menu.department} ${format(
                                  menu.start_at,
                                  "HH:mm"
                                )}`}
                              </span>
                              <IconButton
                                color={"default"}
                                size="small"
                                onClick={() => setMenuToDelete(menu)}
                                sx={{ marginLeft: "5px" }}
                              >
                                <Icon>delete</Icon>
                              </IconButton>
                            </>
                          )}
                        </StyledMenuCard>
                      ) : (
                        <StyledMenuCard
                          style={{
                            backgroundColor: "#d3d3d3",
                          }}
                        >
                          <IconButton
                            color={"default"}
                            size="small"
                            onClick={() => {
                              setDateToCreate(date);
                            }}
                            sx={{ marginLeft: "5px" }}
                          >
                            <Icon>add</Icon>
                          </IconButton>
                        </StyledMenuCard>
                      )}
                    </StyledTableContent>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
      <AppointmentDetailDialog
        id={selectedAppointmentId}
        onClose={() => {
          setSelectedAppointmentId(-1);
        }}
      />
      <DeleteMenuConfirmationDialog
        menu={menuToDelete}
        onOk={() => {
          if (!menuToDelete) {
            return;
          }
          AdminApiClient.deleteMenu(menuToDelete.id).then((res) => {
            addInfo(res.message);
            fetchData();
          });
          setMenuToDelete(undefined);
        }}
        onCancel={() => {
          setMenuToDelete(undefined);
        }}
      />
      <DeleteAllDayMenusConfirmationDialog
        date={dateToDelete}
        onOk={() => {
          if (!dateToDelete) {
            return;
          }
          AdminApiClient.deleteMenusOnTheDay(dateToDelete).then((res) => {
            addInfo(res.message);
            fetchData();
          });
          setDateToDelete(undefined);
        }}
        onCancel={() => {
          setDateToDelete(undefined);
        }}
      />
      <CreateMenuConfirmationDialog
        date={dateToCreate}
        onOk={(department) => {
          if (!dateToCreate) {
            return;
          }
          AdminApiClient.createMenu(dateToCreate, department).then((res) => {
            addInfo(res.message);
            fetchData();
          });
          setDateToCreate(undefined);
        }}
        onCancel={() => {
          setDateToCreate(undefined);
        }}
      />
    </Box>
  );
};

export default WeeklyMenu;
