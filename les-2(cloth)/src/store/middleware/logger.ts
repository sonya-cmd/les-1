import { Middleware, AnyAction } from "redux";
import { RootState } from "../store";

export const loggerMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action: AnyAction) => {
    if (!action.type) {
      return next(action);
    }

    console.log("type: ", action.type);
    console.log("payload: ", action.payload);
    console.log("currentState: ", store.getState());

    const result = next(action);

    console.log("next state: ", store.getState());

    return result;
  };