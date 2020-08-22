import { ExchangeRateActionTypes } from "./actionTypes";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { getExchangeRates } from "../apis/exchangeAPI";
import cogoToast from "cogo-toast";

export const fetchExchangeRates = (
    baseCurrency: string,
    targets?: string[]
) => {
    return async (dispatch: ThunkDispatch<{}, {}, Action>) => {
        dispatch({
            type: ExchangeRateActionTypes.EXCHANGE_RATES_BEGIN,
        });
        try {
            const response = await getExchangeRates(baseCurrency, targets);
            dispatch({
                type: ExchangeRateActionTypes.EXCHANGE_RATES_SUCCESS,
                payload: response.data.rates,
            });
            return response;
        } catch (error) {
            cogoToast.error(
                "Exchange Rates unavailable. Please try after sometime."
            );

            dispatch({
                type: ExchangeRateActionTypes.EXCHANGE_RATES_FAILURE,
            });
        }
    };
};
