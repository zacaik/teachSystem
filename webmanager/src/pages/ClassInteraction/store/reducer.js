import * as actionTypes from "./constants";

const defaultState = {
  isStartModalShow: false,
  isStopModalShow: false,
};

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.SET_START_MODAL_VISIBLE:
      return { ...state, isStartModalShow: action.payload.isStartModalShow };
    default:
      return state;
  }
}

export default reducer;
