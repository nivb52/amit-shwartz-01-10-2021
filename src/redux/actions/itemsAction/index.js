import Axios from "axios";
import { SET_ERROR } from "../errorAction/types";
import { FETCH_ITEMS } from "./types";

export const fetchItemsList = () => async (dispatch) => {
  try {
    const response = await Axios.get("https://fakestoreapi.com/products/");
    const { data } = response;
    dispatch({
      type: FETCH_ITEMS,
      payload: data,
    });
  } catch (e) {
    if (e.response) {
      if (e.response.status > 400) {
        dispatch({ type: SET_ERROR });
      }
    }
    console.error(e);
  }
};
