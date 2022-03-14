import { combineReducers } from "@reduxjs/toolkit";
import homeReducer from "./reducer/home";

const appReducer = combineReducers({
  home: homeReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action)
};

export default rootReducer;