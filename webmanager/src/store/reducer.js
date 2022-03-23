import { combineReducers } from "redux";

import { reducer as userReducer } from "../pages/unAuthPages/store";
import { reducer as interactReducer } from '../pages/ClassInteraction/store'

const cReducer = combineReducers({
  user: userReducer,
  classInteract: interactReducer,
});

export default cReducer;
