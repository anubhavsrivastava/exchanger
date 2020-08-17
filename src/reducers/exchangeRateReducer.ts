import { ExchangeRateActionTypes } from "../action/actionTypes";

type ExchangeRateState = {
    rates: any;
    isLoading: boolean;
};

export const initialState: ExchangeRateState = {
    rates: { EUR: 1 },
    isLoading: false,
};

const exchangeRateReducer = (
    state = initialState,
    action: { type: ExchangeRateActionTypes }
): ExchangeRateState => {
    switch (action?.type) {
        default:
            return state;
    }
};

export { exchangeRateReducer };
