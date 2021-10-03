// errorReducer.js
import { SET_ERROR, HIDE_ERROR } from "../actions/errorAction/types";

const INITIAL_STATE = {
  errorMsg: null,
  errorTitle: null,
  isOpen: false,
};

 const errorReducer = (state = INITIAL_STATE, action) => {
  const { error, errorTitle } = action;
  switch (action.type) {
    case SET_ERROR:
      return {
        errorMsg: error,
        errorTitle,
        isOpen: true,
      };
    case HIDE_ERROR:
      return INITIAL_STATE;
    default:
      return state;
  }
};
export default errorReducer