import { mapKeys } from "lodash";
import nextId from "react-id-generator";
import {
  ADD_DELIVERED_ITEM,
  MOVE_ITEM_TO_ARCHIVE,
  CLEAR_ITEMS_LIST,
  FETCH_ITEMS,
  MOVE_ITEM_TO_DELIVERY,
} from "../actions/itemsAction/types";

// itemsReducer.js
const INITIAL_STATE = {
  itemsList: {},
  localItems: {},
};

const itemsReducer = (state = INITIAL_STATE, action) => {
  const { type, id } = action;
  switch (type) {
    case FETCH_ITEMS:
      return {
        ...state,
        itemsList: mapKeys(action.payload, "id"),
      };
    case ADD_DELIVERED_ITEM: {
      const newId = nextId("localItems");
      return {
        ...state,
        localItems: {
          ...state.localItems,
          [newId]: { ...action.payload, id: newId, isArchived: false },
        },
      };
    }
    case MOVE_ITEM_TO_ARCHIVE:
      return {
        ...state,
        localItems: {
          ...state.localItems,
          [id]: { ...state.localItems[id], isArchived: true },
        },
      };
    case MOVE_ITEM_TO_DELIVERY:
      return {
        ...state,
        localItems: {
          ...state.localItems,
          [id]: { ...state.localItems[id], isArchived: false },
        },
      };
    case CLEAR_ITEMS_LIST:
      return {
        ...state,
        itemsList: {},
      };
    default:
      return state;
  }
};
export default itemsReducer;
