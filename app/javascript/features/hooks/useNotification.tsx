import { Button, Icon, IconButton, Snackbar } from "@material-ui/core";
import * as React from "react";

type Notification = {
  id: number;
  type: "error";
  message: string;
};

type State = {
  notifications: Notification[];
  currentId: number;
};

const initialState = {
  notifications: [],
  currentId: 0,
};

type Dispatcher = {
  addError: (error: string) => void;
  deleteMessage: (id: number) => void;
};

type Context = State & Dispatcher;

type Action =
  | {
      type: "ADD_ERROR";
      payload: string;
    }
  | {
      type: "DELETE_MESSAGE";
      payload: number;
    };

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "ADD_ERROR":
      return {
        ...state,
        notifications: [
          ...state.notifications,
          { id: state.currentId, type: "error", message: action.payload },
        ],
        currentId: state.currentId + 1,
      };
    case "DELETE_MESSAGE":
      return {
        ...state,
        notifications: state.notifications.filter(
          (e) => e.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

const NotificationContext = React.createContext<Context | undefined>(undefined);

type Props = {
  children?: React.ReactNode;
};

export const NotificationContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const addError = React.useCallback(
    (message: string) => {
      dispatch({ type: "ADD_ERROR", payload: message });
    },
    [dispatch]
  );
  const deleteMessage = React.useCallback(
    (id: number) => {
      dispatch({ type: "DELETE_MESSAGE", payload: id });
    },
    [dispatch]
  );
  const value = React.useMemo<Context>(() => {
    return {
      ...state,
      addError,
      deleteMessage,
    };
  }, [state, addError, deleteMessage]);
  return (
    <NotificationContext.Provider value={value}>
      {state.notifications.map((e) => {
        return (
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={true}
            onClose={() => deleteMessage(e.id)}
            message={e.message}
            action={[
              <IconButton
                key="close"
                aria-label="close"
                color="inherit"
                onClick={() => deleteMessage(e.id)}
              >
                <Icon>close</Icon>
              </IconButton>,
            ]}
          />
        );
      })}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = React.useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be within NotificationContextProvider"
    );
  }
  return context;
};
