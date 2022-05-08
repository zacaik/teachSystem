import * as actionTypes from "./constants";
import { login } from "../../../service/user";
import { message } from "antd";

export function setUserAction(res) {
  return {
    type: actionTypes.SET_USER,
    user: res,
  };
}

export const loginAction = (values) => {
  return (dispatch, getState) => {
    login(values)
      .then((res) => {
        console.log(res);
        localStorage.setItem("__auth-provider-token__", res.data.token);
        dispatch(setUserAction(res.data.user));
      })
      .catch((err) => {
        message.error(err);
      });
  };
};
