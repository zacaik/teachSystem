import * as actionTypes from "./constants";

import { login } from "../../../service/user";

function setUserAction(res) {
  return {
    type: actionTypes.SET_USER,
    user: res
  };
}

export const loginAction = (values) => {
  return (dispatch, getState) => {
    console.log(222);
    login(values).then((res) => {
      console.log(res);
      dispatch(setUserAction(res));
    });
  };
};
