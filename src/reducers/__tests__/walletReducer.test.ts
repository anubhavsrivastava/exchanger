import { walletReducer, initialState, WalletState } from "../walletReducer";
import { WalletActionTypes } from "../../actions/actionTypes";

describe("WalletReducer", () => {
    it("has a default initial state", () => {
        expect(
            walletReducer(undefined, {
                type: null,
            })
        ).toEqual(initialState);
    });

    it("has correct begin state", () => {
        const expectedState: WalletState = {
            ...initialState,
            inProgress: true,
        };
        expect(
            walletReducer(initialState, {
                type: WalletActionTypes.EXCHANGE_BEGIN,
            })
        ).toEqual(expectedState);
    });

    it("has updated wallet state for transaction - success", () => {
        const state: WalletState = {
            ...initialState,
            inProgress: false,
            wallet: {
                ...initialState.wallet,
                EUR: { code: "EUR", value: 1100 },
                USD: { code: "USD", value: 700 },
            },
        };

        expect(
            walletReducer(undefined, {
                type: WalletActionTypes.EXCHANGE_SUCCESS,
                payload: {
                    sourceCurrency: { code: "USD", value: 100 },
                    targetCurrency: { code: "EUR", value: 100 },
                },
            })
        ).toEqual(state);
    });

    it("has correct failure state", () => {
        const expectedState: WalletState = {
            ...initialState,
            inProgress: false,
            error: "Unexpected Error",
        };
        expect(
            walletReducer(initialState, {
                type: WalletActionTypes.EXCHANGE_FAILURE,
                payload: { error: "Unexpected Error" },
            })
        ).toEqual(expectedState);
    });
});
