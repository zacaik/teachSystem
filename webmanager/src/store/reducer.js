import { combineReducers } from "redux";

import { reducer as userReducer } from "../pages/unAuthPages/store";

const cReducer = combineReducers({
  user: userReducer,
});

export default cReducer;
