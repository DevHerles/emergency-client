import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { getDateWithFormat } from "../../helpers/Utils";
import axios from 'axios';

import { EMERGENCY_GET_LIST, EMERGENCY_ADD_ITEM } from "../actions";
import { emergencyApi } from '../../constants/defaultValues';

import {
  getEmergencyListSuccess,
  getEmergencyListError,
  addEmergencyItemSuccess,
  addEmergencyItemError,
  unauthorizedEmergency
} from "./actions";

import emergencyData from "../../data/emergency.json";

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  config.headers['Authorization'] = localStorage.getItem('token');
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
    const emergencies = yield call(getEmergencyListRequest);
    if (emergencies.status === 200){
      yield put(getEmergencyListSuccess(emergencies));
    } else if (emergencies.status === 401){
      yield put(unauthorizedEmergency());  
    } else {
      yield put(getEmergencyListError(emergencies));  
    }
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
