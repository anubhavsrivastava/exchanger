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
        USD: { code: "USD", value: 800 },
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

            const sourceWalletAmount =
                wallet[sourceCurrency.code].value - sourceCurrency.value;
            const targetWalletAmount =
                wallet[targetCurrency.code].value + targetCurrency.value;
            const updatedWallet = {
                ...wallet,
                [sourceCurrency.code]: {
                    code: sourceCurrency.code,
                    value: +sourceWalletAmount.toFixed(2),
                },
                [targetCurrency.code]: {
                    code: targetCurrency.code,
                    value: +targetWalletAmount.toFixed(2),
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
