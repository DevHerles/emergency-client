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
  //config.headers['Authorization'] = localStorage.getItem('user_id');
  config.headers['Authorization'] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJFTUVSR0VOQ1kiLCJzdWIiOiI1ZGRmZGE2NmM3NGQwZTM0MzcyMjgwYjEiLCJpYXQiOjE1Nzc3MTk0OTgwNzIsImV4cCI6MTU3NzgwNTg5ODA3Mn0.guP_lww6TNKZZTMyzdKZDPbgzXHCYAyQtKwrJaQmNi4"
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

const addEmergencyItemRequest = async (item) => {
  let emergencies = await axios.post( emergencyApi + '/emergencies/add', item)
    .then(() =>  {
      return axios.get(emergencyApi + '/emergencies')
        .then(emergencies => emergencies)
        .catch(error => error);
    })
    .catch(error => error);
  return emergencies.data;
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
