import * as actionTypes from "./constants";

export function showStartModal() {
  return {
    type: actionTypes.SET_START_MODAL_VISIBLE,
    payload: {
      isStartModalShow: true,
    },
  };
}

export function hideStartModal() {
  return {
    type: actionTypes.SET_START_MODAL_VISIBLE,
    payload: {
      isStartModalShow: false,
    },
  };
}
