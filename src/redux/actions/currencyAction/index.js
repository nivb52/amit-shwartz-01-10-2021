import Axios from "axios";
import { SET_ERROR } from "../errorAction/types";
import { FETCH_CURRENCY, SET_CURRENCY } from "./types";
const API_KEY = "0fabe34672191d1e52c70dab426f1b95";

export const fetchCurrency = () => async (dispatch) => {
  try {
    const response = await Axios.get(
      `http://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}&symbols=USD,ILS`
    );
    const { ILS, USD } = response.data.rates;

    dispatch({
      type: FETCH_CURRENCY,
      payload: ILS / USD,
    });
  } catch (e) {
    if(e.response.status !== 429){
      dispatch({ type: SET_ERROR,  message: e.message });
    }
    
    console.error(e);
  }
};

export const setCurrency = (currency) => (dispatch) => {
  try {
    dispatch({
      type: SET_CURRENCY,
      payload: currency,
    });
  } catch (e) {
    console.error(e);
  }
};
