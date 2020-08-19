import { ExchangeRateActionTypes } from "../actions/actionTypes";

type Rate = {
    [key: string]: number;
};

export type ExchangeRateState = {
    rates: Rate;
    isLoading: boolean;
    error: string;
};

export const initialState: ExchangeRateState = {
    rates: { EUR: 1 },
    isLoading: false,
    error: "",
};

const exchangeRateReducer = (
    state = initialState,
    action: { type: ExchangeRateActionTypes; payload: Rate }
): ExchangeRateState => {
    switch (action?.type) {
        case ExchangeRateActionTypes.EXCHANGE_RATES_BEGIN:
            return { ...state, isLoading: true };
        case ExchangeRateActionTypes.EXCHANGE_RATES_SUCCESS:
            return { ...state, isLoading: false, rates: action.payload };
        case ExchangeRateActionTypes.EXCHANGE_RATES_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: "Couldn't fetch Exchange rates",
            };
        default:
            return state;
    }
};

export { exchangeRateReducer };
