import * as React from "react";

type MenuSerializer = {
  id: number;
  department: string;
  start_at: string;
  end_at: string;
};

type State = {
  menus: MenuSerializer[];
};

const initialState: State = {
  menus: [],
};

type Dispatcher = {
  setMenus: (menus: MenuSerializer[]) => void;
};

type Context = State & Dispatcher;

type Action = {
  type: "SET_MENUS";
  payload: MenuSerializer[];
};

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "SET_MENUS":
      return { ...state, menus: action.payload };
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
