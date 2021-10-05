//store.js
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./redux/reducers";

//save to the local storage
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    console.error(e);
  }
};

//Ensures that during refresh the data inside redux store will not dumped
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

localStorage.clear() //for cleaning unwanted objects
const persistedState = loadFromLocalStorage();

//for redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  persistedState,
  composeEnhancers(applyMiddleware(reduxThunk))
);

//called any time an action is dispatched and save to the local storage
store.subscribe(() => {
  const { items, currency } = store.getState();
  saveToLocalStorage({
    items,
    currency,
  });
});
export default store;
