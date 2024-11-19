import { Button, Icon, IconButton, Snackbar } from "@mui/material";
import * as React from "react";

type Notification = {
  id: number;
  type: "error" | "info";
  message: string;
};

const NotificationBar = (props: { notification: Notification }) => {
  const { notification } = props;
  const { deleteMessage } = useNotification();
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={true}
      onClose={() => deleteMessage(notification.id)}
      message={notification.message}
      color="primary"
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={() => deleteMessage(notification.id)}
        >
          <Icon>close</Icon>
        </IconButton>,
      ]}
    />
  );
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
  addInfo: (message: string) => void;
  deleteMessage: (id: number) => void;
};

type Context = State & Dispatcher;

type Action =
  | {
      type: "ADD_NOTIFICATION";
      payload: { message: string; notificationType: "error" | "info" };
    }
  | {
      type: "DELETE_MESSAGE";
      payload: number;
    };

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            id: state.currentId,
            type: action.payload.notificationType,
            message: action.payload.message,
          },
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
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: { notificationType: "error", message: message },
      });
    },
    [dispatch]
  );
  const addInfo = React.useCallback(
    (message: string) => {
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: { notificationType: "info", message: message },
      });
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
      addInfo,
      deleteMessage,
    };
  }, [state, addError, addInfo, deleteMessage]);
  return (
    <NotificationContext.Provider value={value}>
      {state.notifications.map((e) => {
        return (
          <NotificationBar
            key={"notification-" + e.id.toString()}
            notification={e}
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
