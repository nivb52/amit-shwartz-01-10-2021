import { HIDE_ERROR } from "./types";

export const hideError = () => (dispatch) => {
  try {
    dispatch({ type: HIDE_ERROR });
  } catch (e) {
    console.error(e);
  }
};
