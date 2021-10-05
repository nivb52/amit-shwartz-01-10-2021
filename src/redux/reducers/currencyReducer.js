// currencyReducer.js
import { DOLLAR_SIGN } from "../../consts";
import { FETCH_CURRENCY, SET_CURRENCY } from "../actions/currencyAction/types";

const INITIAL_STATE = {
  currentCurrency: DOLLAR_SIGN,
  rate: {},
};

const currencyReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_CURRENCY:
      return {
        ...state,
        rate: payload,
      };
    case SET_CURRENCY:
      return {
        ...state,
        currentCurrency: payload,
      };
    default:
      return state;
  }
};
export default currencyReducer;
