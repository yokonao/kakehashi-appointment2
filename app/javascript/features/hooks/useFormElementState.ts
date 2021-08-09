import * as React from "react";

type State = {
  isValid: boolean;
  errorMessages: string[];
};

const initialState: State = {
  isValid: false,
  errorMessages: [],
};

type Action =
  | {
      type: "VERIFY";
    }
  | {
      type: "ADD_ERROR_MESSAGE";
      payload: string;
    }
  | {
      type: "SET_EXTERNAL_ERRORS";
      payload: string[];
    };

const reducer: React.Reducer<State, Action> = (
  state: State,
  action: Action
) => {
  switch (action.type) {
    case "VERIFY":
      return { isValid: true, errorMessages: [], externalErrors: [] };
    case "ADD_ERROR_MESSAGE":
      return {
        ...state,
        isValid: false,
        errorMessages: Array.from(
          new Set([...state.errorMessages, action.payload])
        ),
      };
    case "SET_EXTERNAL_ERRORS":
      return { ...state, isValid: false, externalErrors: action.payload };
    default:
      return state;
  }
};
const useFormElementState = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const verify = React.useCallback(
    () => dispatch({ type: "VERIFY" }),
    [dispatch]
  );
  const addErrorMessage = React.useCallback(
    (message: string) =>
      dispatch({ type: "ADD_ERROR_MESSAGE", payload: message }),
    [dispatch]
  );
  const setExternalErrors = React.useCallback(
    (externalErrors: string[]) => {
      dispatch({ type: "SET_EXTERNAL_ERRORS", payload: externalErrors });
    },
    [dispatch]
  );
  return { state, verify, addErrorMessage, setExternalErrors };
};

export default useFormElementState;
