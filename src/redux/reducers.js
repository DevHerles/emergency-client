import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import emergencyApp from './emergency/reducer';
import { webSocket } from './webSocket/reducer';

const reducers = combineReducers({
  menu,
  settings,
  authUser,
  emergencyApp,
  webSocket
});

export default reducers;