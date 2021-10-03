import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import itemsReducer from "./itemsReducer";

export default combineReducers({
  items: itemsReducer,
  error: errorReducer,
});
