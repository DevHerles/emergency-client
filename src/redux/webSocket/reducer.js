import {
    WS_CONNECT,
    WS_DISCONNECT,
    WS_NEW_MESSAGE,
    WS_CONNECTED,
} from "../actions";

import { appSocketHost } from "../../constants/defaultValues";

const websocketInitialState = {
  host: appSocketHost,
  socket: null,
  payload: null,
};

export const webSocket = (state = { ...websocketInitialState }, action) => {
  switch (action.type) {
    case WS_CONNECT:
      return { ...state, host: action.host };
    case WS_CONNECTED:
      return { ...state, socket: action.socket };
    case WS_DISCONNECT:
      return { ...state, };
    case WS_NEW_MESSAGE:
      return { ...state, payload: { data: action.payload, socket: state.socket } };
    default:
      return state;
  }
};