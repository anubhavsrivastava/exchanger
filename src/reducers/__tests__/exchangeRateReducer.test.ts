import {
    exchangeRateReducer,
    initialState,
    ExchangeRateState,
} from "../exchangeRateReducer";
import { ExchangeRateActionTypes } from "../../actions/actionTypes";

describe("ExchangeRateReducer", () => {
    it("has a default initial state", () => {
        expect(
            exchangeRateReducer(undefined, {
                type: null,
                payload: null,
            })
        ).toEqual(initialState);
    });

    it("has correct begin state", () => {
        const expectedState: ExchangeRateState = {
            ...initialState,
            isLoading: true,
        };
        expect(
            exchangeRateReducer(initialState, {
                type: ExchangeRateActionTypes.EXCHANGE_RATES_BEGIN,
            })
        ).toEqual(expectedState);
    });

    it("has updated wallet state for transaction", () => {
        const state: ExchangeRateState = {
            ...initialState,
            isLoading: false,
            rates: { ...initialState.rates, USD: 1, GBP: 2 },
        };

        expect(
            exchangeRateReducer(undefined, {
                type: ExchangeRateActionTypes.EXCHANGE_RATES_SUCCESS,
                payload: { USD: 1, GBP: 2 },
            })
        ).toEqual(state);
    });

    it("has correct failure state", () => {
        const expectedState: ExchangeRateState = {
            ...initialState,
            isLoading: false,
            error: "Couldn't fetch Exchange rates",
        };
        expect(
            exchangeRateReducer(initialState, {
                type: ExchangeRateActionTypes.EXCHANGE_RATES_FAILURE,
            })
        ).toEqual(expectedState);
    });
});
