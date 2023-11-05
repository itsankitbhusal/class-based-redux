import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import weatherReducer from "./reducers/weatherReducer";
import { compose } from "redux";

const store = createStore(
  weatherReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
