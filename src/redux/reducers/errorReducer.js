// errorReducer.js
import { SET_ERROR, HIDE_ERROR } from "../actions/errorAction/types";

const INITIAL_STATE = {
  message: null,
  title: "Error Ocurred",
  isOpen: false,
};

 const errorReducer = (state = INITIAL_STATE, action) => {
  const { message, title } = action;
  switch (action.type) {
    case SET_ERROR:
      return {
        message,
        title,
        isOpen: true,
      };
    case HIDE_ERROR:
      return INITIAL_STATE;
    default:
      return state;
  }
};
export default errorReducer