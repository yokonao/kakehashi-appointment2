import * as React from "react";
import { AppointmentSerializer } from "../../../serializers/AppointmentSerializer";
import { MenuSerializer } from "../../../serializers/MenuSerializer";
import { AdminApiClient } from "../api/AdminApiClient";

type State = {
  menus: MenuSerializer[];
  appointments: AppointmentSerializer[];
  isLoading: boolean;
};

const initialState: State = {
  menus: [],
  appointments: [],
  isLoading: false,
};

type Dispatcher = {
  fetchData: () => void;
};

type Context = State & Dispatcher;

type Action =
  | {
      type: "SET_MENUS";
      payload: MenuSerializer[];
    }
  | {
      type: "SET_APPOINTMENTS";
      payload: AppointmentSerializer[];
    }
  | {
      type: "SET_IS_LOADING";
      payload: boolean;
    };

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "SET_MENUS":
      return { ...state, menus: action.payload };
    case "SET_APPOINTMENTS":
      return { ...state, appointments: action.payload };
    case "SET_IS_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

const AdminContext = React.createContext<Context | undefined>(undefined);

type Props = {
  children?: React.ReactNode;
};

export const AdminContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const fetchData = React.useCallback(() => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    Promise.all([
      AdminApiClient.getMenus(),
      AdminApiClient.getAppointments(),
    ]).then((value) => {
      if (value.some((e) => !e.success)) {
        // TODO エラーの通知
        return;
      }
      const [{ data: menus }, { data: appointments }] = value;
      dispatch({ type: "SET_MENUS", payload: menus });
      dispatch({ type: "SET_APPOINTMENTS", payload: appointments });
      dispatch({ type: "SET_IS_LOADING", payload: false });
    });
  }, [dispatch]);
  const value = React.useMemo<Context>(
    () => ({ ...state, fetchData }),
    [state, fetchData]
  );
  React.useEffect(() => {
    fetchData();
  }, []);
  console.log(value);
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  const context = React.useContext(AdminContext);
  if (!context) {
    throw new Error("useAdminContext must be within AdminContextProvider");
  }
  return context;
};
