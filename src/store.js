import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { listPostReducer, postNewsReducer } from "./reducers/postReducers";

const initialState = {};
const reducer = combineReducers({
  postNews: postNewsReducer,
  listNews: listPostReducer,

});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
