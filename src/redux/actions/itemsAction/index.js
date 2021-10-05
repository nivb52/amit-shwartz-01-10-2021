import Axios from "axios";
import { SET_ERROR } from "../errorAction/types";
import {
  ADD_DELIVERED_ITEM,
  CLEAR_ITEMS_LIST,
  FETCH_ITEMS,
  MOVE_ITEM_TO_ARCHIVE,
  MOVE_ITEM_TO_DELIVERY,
} from "./types";

export const fetchItemsList = () => async (dispatch) => {
  try {
    const response = await Axios.get("https://fakestoreapi.com/products/");
    const { data } = response;
    dispatch({
      type: FETCH_ITEMS,
      payload: data,
    });
  } catch (e) {
    dispatch({ type: SET_ERROR, message: e.message });
    console.error(e);
  }
};

export const clearItemsList = () => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_ITEMS_LIST,
    });
  } catch (e) {
    console.error(e);
  }
};

export const addDeliveredItem = (formValues) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_DELIVERED_ITEM,
      payload: formValues,
    });
  } catch (e) {
    console.error(e);
  }
};

export const moveItemToArchive = (id) => async (dispatch) => {
  try {
    dispatch({
      type: MOVE_ITEM_TO_ARCHIVE,
      id,
    });
  } catch (e) {
    console.error(e);
  }
};

export const moveItemToDelivery = (id) => async (dispatch) => {
  try {
    dispatch({
      type: MOVE_ITEM_TO_DELIVERY,
      id,
    });
  } catch (e) {
    console.error(e);
  }
};
