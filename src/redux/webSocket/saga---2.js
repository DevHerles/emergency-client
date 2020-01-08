import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
    WS_CONNECT,
    WS_DISCONNECT,
    WS_NEW_MESSAGE
} from '../actions';

import {
    connectToSocketSuccess,
    connectToSocketError
} from "./actions";

import {
    addSocketEmergencyItem,
} from "./../emergency/actions";
import { eventChannel } from "redux-saga";

let socket = null;

function socketOnMessage (event) {
    const data = JSON.parse(event.data)
    switch (data.type) {
        case "WS_CONNECTED":
            console.log(data.message);
            break
        case "WS_HELLO_CLIENT":
            console.log(data.message);
            break
        case "types.ADD_USER":
            console.log(data);
            break
        case 'EMERGENCY_ADD_ITEM':
            console.log('New case: ', data.data);
            //const response = yield call(_addNewEmergencyItem, data.data);
            sendMessageToSocket(data);
            //console.log(response);
            break;
        default:
            break
    }
};

const connectToSocketRequest = async (host) => {
    try {
        socket = new WebSocket(host);    
    } catch (error) {
        return {"message": error}
    }
    return socket;
}

function* sendMessageToSocket({payload}) {
    try {
        socket.send(JSON.stringify({
            type: payload.type,
            data: payload.data
        }));
        yield put(addSocketEmergencyItem(payload.data));

    } catch (error) {
        
    }
}

function* connectToSocket ({ host }) {
    try {
        const socket = yield call(connectToSocketRequest, host);
        socket.onopen = () => {
            socket.send(JSON.stringify({
                type: "NEW_USER",
                name: "John Doe"
            }))
        };

        socket.onerror = (error) => {
            console.log('WebSocket error ' + error)
            console.dir(error)
        };

        socket.onmessage = socketOnMessage;
        //  (event, store) => {
        //     const data = JSON.parse(event.data)
        //     switch (data.type) {
        //         case 'EMERGENCY_ADD_ITEM':
        //             console.log('New case: ', data.data);
        //             event.dispatch(addEmergencyItem, data.data);
        //             break;
        //         default:
        //             break
        //     }
        // }
        
        yield put(connectToSocketSuccess(socket));
        ///https://github.com/flaviocopes/chat-app-react-redux-saga-websockets

        // socket.onmessage = (event) => {
        //     const data = JSON.parse(event.data)
        //     switch (data.type) {
        //         case "types.ADD_MESSAGE":
        //             console.log("yield put(messageReceived(data.message, data.author))");
        //             break
        //         case "types.USERS_LIST":
        //             console.log("yield put(populateUsersList(data.users))");
        //             break
        //         case "types.ADD_USER":
        //             console.log(data);
        //             break
        //         default:
        //             break
        //     }
        // };
    } catch (error) {
        yield put(connectToSocketError(error));
    }
}

function* connectToSocket2 ({host}){
    return eventChannel( emmiter => {
        const ws = new WebSocket(host);
        ws.onmessage = e => {
            return emmiter({type: e.type, payload: e.data});
        }
    });
}

export function* watchConnectToSocket() {
    yield takeEvery(WS_CONNECT, connectToSocket);
    //yield takeEvery(WS_CONNECT, connectToSocket2);
}

export function* watchSendMessageToSocket() {
    yield takeEvery(WS_NEW_MESSAGE, sendMessageToSocket);
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
        fork(watchDisconnectFromSocket),
        fork(watchSendMessageToSocket)
    ])
}