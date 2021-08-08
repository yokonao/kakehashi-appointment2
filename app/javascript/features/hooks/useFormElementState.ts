import * as React from "react";

type State = {
  isValid: boolean;
  errorMessages: string[];
  externalErrors: string[];
};

const initialState: State = {
  isValid: false,
  errorMessages: [],
  externalErrors: [],
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
      if (state.externalErrors.length > 0) return state;
      return { isValid: true, errorMessages: [], externalErrors: [] };
    case "ADD_ERROR_MESSAGE":
      return {
        ...state,
        errorMessages: [...state.errorMessages, action.payload],
      };
    case "SET_EXTERNAL_ERRORS":
      return { ...state, sisValid: false, externalErrors: action.payload };
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
