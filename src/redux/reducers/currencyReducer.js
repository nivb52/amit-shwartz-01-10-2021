
// currencyReducer.js
import { FETCH_CURRENCY } from "../actions/currencyAction/types";

const INITIAL_STATE = {
  rate: {},
};

const currencyReducer = (state = INITIAL_STATE, action) => {
  const { type, rate } = action;
  switch (type) {
    case FETCH_CURRENCY:
      return {
        rate,
      };
    default:
      return state;
  }
};
export default currencyReducer;
