import { WalletActionTypes } from "../actions/actionTypes";
import { Wallet } from "../models/wallet";
import { Currency } from "../models/currency";

export type WalletState = {
    wallet: Wallet;
    inProgress: boolean;
};

export type TransactionPayload = {
    sourceCurrency: Currency;
    targetCurrency: Currency;
};

export const initialState: WalletState = {
    wallet: {
        EUR: { code: "EUR", value: 1000 },
        GBP: { code: "GBP", value: 500 },
        USD: { code: "USD", value: 1000 },
    },
    inProgress: false,
};

export const walletReducer = (
    state = initialState,
    action: { type: WalletActionTypes; payload: TransactionPayload }
): WalletState => {
    switch (action?.type) {
        case WalletActionTypes.EXCHANGE_BEGIN:
            const { sourceCurrency, targetCurrency } = action.payload;
            const { wallet } = state;

            const updatedWallet = {
                ...wallet,
                [sourceCurrency.code]: {
                    code: sourceCurrency.code,
                    value:
                        wallet[sourceCurrency.code].value -
                        sourceCurrency.value,
                },
                [targetCurrency.code]: {
                    code: targetCurrency.code,
                    value:
                        wallet[targetCurrency.code].value +
                        +targetCurrency.value,
                },
            };
            return {
                ...state,
                inProgress: true,
                wallet: updatedWallet,
            };
        case WalletActionTypes.EXCHANGE_SUCCESS:
            return {
                ...state,
                inProgress: false,
            };
        case WalletActionTypes.EXCHANGE_FAILURE:
            return {
                ...state,
                inProgress: false,
            };
        default:
            return state;
    }
};
