import { WalletActionTypes } from "./actionTypes";
import { Currency } from "../models/currency";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import cogoToast from "cogo-toast";

export const executeWalletTransaction = (
    sourceCurrency: Currency,
    targetCurrency: Currency
) => (dispatch: ThunkDispatch<{}, {}, Action>) => {
    try {
        dispatch({
            type: WalletActionTypes.EXCHANGE_BEGIN,
        });
        dispatch({
            type: WalletActionTypes.EXCHANGE_SUCCESS,
            payload: { sourceCurrency, targetCurrency },
        });
        cogoToast.success("Wallet updated successfully.");
    } catch (error) {
        dispatch({ type: WalletActionTypes.EXCHANGE_FAILURE });
        cogoToast.error("Failed to update wallet.");
    }
};
