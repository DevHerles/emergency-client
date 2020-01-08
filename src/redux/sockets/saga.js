import { takeEvery } from 'redux-saga/effects';
import * as types from '../sockets/ActionTypes';

const handleNewMessage = function* handleNewMessage(params) {
  yield takeEvery(types.ADD_MESSAGE, (action) => {
    console.log(params);
    console.log(action);
    params.socket.send(JSON.stringify(action));
  });
}

export default handleNewMessage;