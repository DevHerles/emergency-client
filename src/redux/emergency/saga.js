import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { getDateWithFormat } from "../../helpers/Utils";

import { CALL_GET_LIST, CALL_ADD_ITEM } from "../actions";

import {
  getCallListSuccess,
  getCallListError,
  addCallItemSuccess,
  addCallItemError
} from "./actions";

import callData from "../../data/calls.json";

const getCallListRequest = async () => {
  return await new Promise((success, fail) => {
    setTimeout(() => {
      success(callData.data);
    }, 1000);
  })
    .then(response => response)
    .catch(error => error);
};

function* getCallListItems() {
  try {
    const response = yield call(getCallListRequest);
    yield put(getCallListSuccess(response));
  } catch (error) {
    yield put(getCallListError(error));
  }
}

const addCallItemRequest = async item => {
  let items = callData.data;
  item.id = items.length + 1;
  item.createDate = getDateWithFormat();
  items.splice(0, 0, item);
  return await new Promise((success, fail) => {
    setTimeout(() => {
      success(items);
    }, 1000);
  })
    .then(response => response)
    .catch(error => error);
};

function* addCallItem({ payload }) {
  try {
    const response = yield call(addCallItemRequest, payload);
    yield put(addCallItemSuccess(response));
  } catch (error) {
    yield put(addCallItemError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(CALL_GET_LIST, getCallListItems);
}

export function* wathcAddItem() {
  yield takeEvery(CALL_ADD_ITEM, addCallItem);
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(wathcAddItem)]);
}
