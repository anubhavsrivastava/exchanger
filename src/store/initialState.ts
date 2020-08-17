import { initialState as exchangeInitialState } from "../reducers/exchangeRateReducer";
import { initialState as walletInitialState } from "../reducers/walletReducer";

export default {
    exchangeRate: exchangeInitialState,
    walletDetails: walletInitialState,
};
