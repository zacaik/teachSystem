import * as actionTypes from "./constants";
import { useNavigate } from 'react-router-dom'
import { login } from "../../../service/user";
import { message } from 'antd';

export function setUserAction(res) {
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
      localStorage.setItem("__auth-provider-token__", res.data.token);
      dispatch(setUserAction(res.data));
    }).catch((err) => {
      message.error(err);
    });
  };
};
