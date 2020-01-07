import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
    WS_CONNECT,
    WS_DISCONNECT
} from '../actions';

import {
    wsConnected,
    wsDisconnected
} from './actions';

let socket = null;

function* onOpen(event) {
    yield put(wsConnected(event.target.url));
};

function* onClose() {
    yield put(wsDisconnected());
};

function* onMessage(event) {
    const payload = JSON.parse(event.data);
    // switch (payload.type) {
    //   case 'update_game_players':
    //     store.dispatch(updateGame(payload.game));
    //     break;
    //   case 'update_timer':
    //     store.dispatch(updateTimer(payload.time));
    //     break;
    //   case 'update_game_player':
    //     console.log(payload);
    //     store.dispatch(updateGamePlayer(payload.current_player));
    //     break;
    //   default:
    //     console.log(payload);
    //     break;
    // }
};

function* connectToSocket({ host }) {
    try {
        if (socket !== null) {
            socket.close();
        }
        // connect to the remote host
        socket = new WebSocket(host);
    
        // websocket handlers
        socket.onmessage = onMessage();
        socket.onclose = onClose();
        socket.onopen = onOpen();

        console.log("connect: " + host);

        // const connected = yield call(connectToSocketAsync, payload);
        // if (!connected.error) {
        //     yield put(wsConnected);
        // } else {
        //     yield put(wsDisconnected);
        // }
    } catch (error) {
        console.log('connectToSocket error...');
    }
}

export function* watchConnectToSocket() {
    yield takeEvery(WS_CONNECT, connectToSocket);
}

function* disconnectFromSocket({ payload }) {
    console.log("disconnect: " + payload)
    if (socket !== null) {
        socket.close();
      }
    socket = null;
}

export function* watchDisconnectFromSocket() {
    yield takeEvery(WS_DISCONNECT, disconnectFromSocket);
}

export default function* rootSaga() {
    yield all([
        fork(watchConnectToSocket),
        fork(watchDisconnectFromSocket)
    ])
}