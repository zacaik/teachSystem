import * as actionTypes from "./constants";

export function setUserAction(res) {
  return {
    type: actionTypes.SET_USER,
    user: res,
  };
}
