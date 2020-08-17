import { combineReducers } from "redux";
import { exchangeRateReducer } from "./exchangeRateReducer";
import { walletReducer } from "./walletReducer";
export default combineReducers({
    exchangeRate: exchangeRateReducer,
    walletDetails: walletReducer,
});
