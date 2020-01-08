import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import emergencySagas from './emergency/saga';
//import webSocket from './webSocket/saga';
import handleNewMessage from './sockets/saga';
import { startStopChannel } from '../modules/socket.io';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    emergencySagas(),
    //webSocket(),
    handleNewMessage(getState),
    startStopChannel(),
  ]);
}