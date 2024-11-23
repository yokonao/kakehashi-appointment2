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
import { MenuSerializer } from "../../../serializers/MenuSerializer";
import { getReservableMenus } from "../../../shared/api/getAllMenus";
import { useNotification } from "./useNotification";

type State = {
  internalMedicineMenus: MenuSerializer[];
  kampoMenus: MenuSerializer[];
  isLoading: boolean;
};

const initialState: State = {
  internalMedicineMenus: [],
  kampoMenus: [],
  isLoading: true,
};

type Dispatcher = {
  setMenus: (menus: MenuSerializer[]) => void;
};

type Context = State & Dispatcher;

type Action =
  | {
      type: "SET_INTERNAL_MEDICINE_MENUS";
      payload: MenuSerializer[];
    }
  | {
      type: "SET_KAMPO_MENUS";
      payload: MenuSerializer[];
    }
  | {
      type: "SET_IS_LOADING";
      payload: boolean;
    };

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "SET_INTERNAL_MEDICINE_MENUS":
      return { ...state, internalMedicineMenus: action.payload };
    case "SET_KAMPO_MENUS":
      return { ...state, kampoMenus: action.payload };
    case "SET_IS_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

const MenusContext = createContext<Context | undefined>(undefined);

type Props = {
  children?: ReactNode;
};

export const MenusContextProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setMenus = useCallback(
    (menus: MenuSerializer[]) => {
      dispatch({
        type: "SET_INTERNAL_MEDICINE_MENUS",
        payload: menus.filter((e) => e.department === "内科"),
      });
      dispatch({
        type: "SET_KAMPO_MENUS",
        payload: menus.filter((e) => e.department === "漢方"),
      });
    },
    [dispatch]
  );
  const { addError, addInfo } = useNotification();
  const value = useMemo(
    () => ({
      ...state,
      setMenus,
    }),
    [state, setMenus]
  );
  useEffect(() => {
    getReservableMenus().then((res) => {
      if (res.error.length > 0) {
        addError(res.error);
      }
      setMenus(res.result);
      dispatch({ type: "SET_IS_LOADING", payload: false });
    });
  }, []);
  return (
    <MenusContext.Provider value={value}>{children}</MenusContext.Provider>
  );
};

export const useMenusContext = () => {
  const context = useContext(MenusContext);
  if (!context) {
    throw new Error("useMenusContext must be within MenusContextProvider");
  }
  return context;
};
