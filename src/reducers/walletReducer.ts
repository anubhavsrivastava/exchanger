import { WalletActionTypes } from "../actions/actionTypes";
import { Wallet } from "../models/wallet";
import { Currency } from "../models/currency";

export type WalletState = {
    wallet: Wallet;
    inProgress: boolean;
    error: string;
};

export type TransactionPayload = {
    sourceCurrency: Currency;
    targetCurrency: Currency;
};

export type ErrorPayload = {
    error: string;
};

export const initialState: WalletState = {
    wallet: {
        EUR: { code: "EUR", value: 1000 },
        GBP: { code: "GBP", value: 500 },
        USD: { code: "USD", value: 800 },
    },
    inProgress: false,
    error: "",
};

export const walletReducer = (
    state = initialState,
    action: {
        type: WalletActionTypes | null;
        payload?: TransactionPayload | ErrorPayload;
    }
): WalletState => {
    switch (action?.type) {
        case WalletActionTypes.EXCHANGE_BEGIN:
            return {
                ...state,
                inProgress: true,
            };
        case WalletActionTypes.EXCHANGE_SUCCESS:
            const {
                sourceCurrency,
                targetCurrency,
            } = action.payload as TransactionPayload;
            const { wallet } = state;

            const sourceWalletAmount =
                wallet[sourceCurrency.code].value - sourceCurrency.value;
            const targetWalletAmount =
                (wallet[targetCurrency.code]?.value || 0) +
                targetCurrency.value;
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
                inProgress: false,
                wallet: updatedWallet,
            };
        case WalletActionTypes.EXCHANGE_FAILURE:
            const { error } = action.payload as ErrorPayload;
            return {
                ...state,
                inProgress: false,
                error,
            };
        default:
            return state;
    }
};
