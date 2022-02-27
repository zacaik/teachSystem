import * as actionTypes from "./constants";

const defaultState = {
  user: null
};

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.SET_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
}

export default reducer;
