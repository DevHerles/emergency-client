import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import emergencySagas from './emergency/saga';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    emergencySagas()
  ]);
}