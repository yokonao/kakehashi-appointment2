import {
  Reducer,
  createContext,
  ReactNode,
  FC,
  useReducer,
  useCallback,
  useMemo,
  useEffect,
  useContext,
} from "react";
import { AppointmentSerializer } from "../../../serializers/AppointmentSerializer";
import { MenuAdminSerializer } from "../../../serializers/MenuAdminSerializer";
import { AdminApiClient } from "../api/AdminApiClient";

type State = {
  menus: MenuAdminSerializer[];
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
      payload: MenuAdminSerializer[];
    }
  | {
      type: "SET_APPOINTMENTS";
      payload: AppointmentSerializer[];
    }
  | {
      type: "SET_IS_LOADING";
      payload: boolean;
    };

const reducer: Reducer<State, Action> = (state, action) => {
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

const AdminContext = createContext<Context | undefined>(undefined);

type Props = {
  children?: ReactNode;
};

export const AdminContextProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchData = useCallback(() => {
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
  const value = useMemo<Context>(
    () => ({ ...state, fetchData }),
    [state, fetchData]
  );
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdminContext must be within AdminContextProvider");
  }
  return context;
};
