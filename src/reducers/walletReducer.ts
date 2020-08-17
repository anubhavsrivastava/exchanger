import { WalletActionTypes } from "../action/actionTypes";
import { Wallet } from "../model/wallet";

type WalletState = {
    wallet: Wallet;
    inProgress: boolean;
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
    action: { type: WalletActionTypes; payload: any }
): WalletState => {
    switch (action?.type) {
        case WalletActionTypes.EXCHANGE_BEGIN:
            return {
                ...state,
                inProgress: true,
            };
        case WalletActionTypes.EXCHANGE_SUCCESS:
            return {
                ...state,
                inProgress: false,
                wallet: {
                    ...state.wallet,
                },
            };
        default:
            return state;
    }
};
