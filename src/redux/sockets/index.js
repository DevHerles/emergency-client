
import * as types from './ActionTypes';
import { addUser, messageReceived } from './actions';
import {
  addSocketEmergencyItem,
} from "./../emergency/actions";

import { appSocketHost } from '../../constants/defaultValues';

const setupSocket = (dispatch, username) => {
  const socket = new WebSocket(appSocketHost);

  socket.onopen = () => {
    socket.send(JSON.stringify({
      type: types.ADD_USER,
      name: username
    }));
  }

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    switch(data.type){
      case types.ADD_MESSAGE:
        dispatch(addSocketEmergencyItem(data.message));
      case types.ADD_USER:
        dispatch(addUser(data));
      default:
        console.log(data);
        break 
    }
  }

  return socket;
}

export default setupSocket;