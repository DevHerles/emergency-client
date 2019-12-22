import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { getDateWithFormat } from "../../helpers/Utils";
import axios from 'axios';

import { EMERGENCY_GET_LIST, EMERGENCY_ADD_ITEM } from "../actions";
import { emergencyApi } from '../../constants/defaultValues';

import {
  getEmergencyListSuccess,
  getEmergencyListError,
  addEmergencyItemSuccess,
  addEmergencyItemError
} from "./actions";

import emergencyData from "../../data/emergency.json";

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers['Authorization'] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJFTUVSR0VOQ1kiLCJzdWIiOiI1ZGUwMWRmY2I5Y2Q3YjM3ZTI4ZWVjMWQiLCJpYXQiOjE1Nzc0NzQ5Mjg5MjgsImV4cCI6MTU3NzU2MTMyODkyOH0.m_1dA5o9JQyvqgzCJ5PyY5Swrj07c7mXDZHMqh3cqjc";
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

const getEmergencyListRequest = async () => {
  return await axios.get( emergencyApi + '/emergencies')
    .then(emergencies => emergencies)
    .catch(error => error);   
};

function* getEmergencyListItems() {
  try {
    const response = yield call(getEmergencyListRequest);
    yield put(getEmergencyListSuccess(response));
  } catch (error) {
    yield put(getEmergencyListError(error));
  }
}

const addEmergencyItemRequest = async item => {
  let items = emergencyData.data;
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

function* addEmergencyItem({ payload }) {
  try {
    const response = yield call(addEmergencyItemRequest, payload);
    yield put(addEmergencyItemSuccess(response));
  } catch (error) {
    yield put(addEmergencyItemError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(EMERGENCY_GET_LIST, getEmergencyListItems);
}

export function* wathcAddItem() {
  yield takeEvery(EMERGENCY_ADD_ITEM, addEmergencyItem);
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(wathcAddItem)]);
}
