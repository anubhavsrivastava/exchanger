import {
    initialState as exchangeInitialState,
    ExchangeRateState,
} from "../reducers/exchangeRateReducer";

import {
    initialState as walletInitialState,
    WalletState,
} from "../reducers/walletReducer";

export type StoreState = {
    exchangeRate: ExchangeRateState;
    walletDetails: WalletState;
};

const initialState: StoreState = {
    exchangeRate: exchangeInitialState,
    walletDetails: walletInitialState,
};

export default initialState;
