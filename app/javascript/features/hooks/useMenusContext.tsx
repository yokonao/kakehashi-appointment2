import { any } from "prop-types";
import * as React from "react";
import client from "../../shared/api/client";

export type MenuSerializer = {
  id: number;
  department: string;
  start_at: Date;
  end_at: Date;
};

function createMenusFromResponse(data: any): MenuSerializer[] {
  return data.map((e: any) => ({
    id: e.id,
    department: e.department,
    start_at: new Date(e.start_at),
    end_at: new Date(e.end_at),
  }));
}

type State = {
  menus: MenuSerializer[];
  isLoading: boolean;
};

const initialState: State = {
  menus: [],
  isLoading: true,
};

type Dispatcher = {
  setMenus: (menus: MenuSerializer[]) => void;
};

type Context = State & Dispatcher;

type Action =
  | {
      type: "SET_MENUS";
      payload: MenuSerializer[];
    }
  | {
      type: "SET_IS_LOADING";
      payload: boolean;
    };

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "SET_MENUS":
      return { ...state, menus: action.payload };
    case "SET_IS_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

const MenusContext = React.createContext<Context | undefined>(undefined);

type Props = {
  children?: React.ReactNode;
};

export const MenusContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const setMenus = React.useCallback(
    (menus: MenuSerializer[]) =>
      dispatch({ type: "SET_MENUS", payload: menus }),
    [dispatch]
  );
  const value = React.useMemo(
    () => ({
      ...state,
      setMenus,
    }),
    [state, setMenus]
  );
  React.useEffect(() => {
    client
      .get<MenuSerializer[]>("/api/v1/menus/index")
      .then((res) => {
        const menus = createMenusFromResponse(res.data);
        dispatch({ type: "SET_MENUS", payload: menus });
        dispatch({ type: "SET_IS_LOADING", payload: false });
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <MenusContext.Provider value={value}>{children}</MenusContext.Provider>
  );
};

export const useMenusContext = () => {
  const context = React.useContext(MenusContext);
  if (!context) {
    throw new Error("useMenusContext must be within MenusContextProvider");
  }
  return context;
};
