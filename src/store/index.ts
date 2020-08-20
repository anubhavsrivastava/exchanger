import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";
import initialState from "./initialState";

let composeEnhancers = compose;

if (process.env.REACT_APP_ENABLE_DEVTOOLS === "true") {
    composeEnhancers =
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

export default createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
);
