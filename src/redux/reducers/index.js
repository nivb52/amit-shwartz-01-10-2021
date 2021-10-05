import { combineReducers } from "redux";
import currencyReducer from "./currencyReducer";
import errorReducer from "./errorReducer";
import itemsReducer from "./itemsReducer";

export default combineReducers({
  items: itemsReducer,
  error: errorReducer,
  currency: currencyReducer,
});
