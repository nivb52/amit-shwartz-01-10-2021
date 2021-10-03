import { mapKeys } from "lodash";
import {
  FETCH_ITEMS,
  SET_ARCHIVE_ITEMS,
  SET_DELIVERED_ITEMS,
} from "../actions/itemsAction/types";

// itemsReducer.js
const INITIAL_STATE = {
  itemsList: {},
  deliveredItems: [],
  archivedItems: [],
};

const itemsReducer = (state = INITIAL_STATE, action) => {
  const { type } = action;
  switch (type) {
    case FETCH_ITEMS:
      return {
        ...state,
        itemsList: mapKeys(action.payload, "id"),
      };
    case SET_DELIVERED_ITEMS:
      return {
        ...state,
        deliveredItems: action.payload,
      };
    case SET_ARCHIVE_ITEMS:
      return {
        ...state,
        archivedItems: action.payload,
      };
    default:
      return state;
  }
};
export default itemsReducer;
