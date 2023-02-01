import { combineReducers } from "redux";
import authReducer from "./authReducers.js";
import postReducer from "./postReducer.js";
export const reducers= combineReducers({authReducer,postReducer})
