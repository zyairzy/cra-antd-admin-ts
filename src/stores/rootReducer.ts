import { combineReducers } from '@reduxjs/toolkit';
import globalReducer from './slicers/global';

const rootReducer = combineReducers({
  appGlobal: globalReducer,
});

export default rootReducer;
