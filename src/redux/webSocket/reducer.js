import {
    WS_CONNECT
} from "../actions";

const websocketInitialState = {};

export const webSocket = (state = { ...websocketInitialState }, action) => {
  switch (action.type) {
    case WS_CONNECT:
      return { ...state, host: action.host };
    default:
      return state;
  }
};