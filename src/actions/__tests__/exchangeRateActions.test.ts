import { ExchangeRateActionTypes } from "../actionTypes";
import configureMockStore, { MockStore } from "redux-mock-store";
import reduxThunk from "redux-thunk";
import moxios from "moxios";
import { AnyAction } from "redux";
import { Currency } from "../../models/currency";
import { fetchExchangeRates } from "../exchangeRateActions";
const middlewares = [reduxThunk];
const mockStore = configureMockStore(middlewares);

describe("exchangeRate Actions", () => {
    let store: MockStore;
    beforeEach(function () {
        store = mockStore({ exchangeRates: {} });
        moxios.install();
    });

    afterEach(function () {
        moxios.uninstall();
    });

    it("dispatches EXCHANGE_RATES_SUCCESS after successful fetching rates", () => {
        const exchangeRatesData = {
            rates: { USD: 1.1769, GBP: 0.89755 },
            base: "EUR",
        };
        moxios.stubRequest(/latest.*/, {
            status: 200,
            response: exchangeRatesData,
        });

        const expectedActions = [
            { type: ExchangeRateActionTypes.EXCHANGE_RATES_BEGIN },
            {
                type: ExchangeRateActionTypes.EXCHANGE_RATES_SUCCESS,
                payload: exchangeRatesData.rates,
            },
        ];

        return store
            .dispatch(
                (fetchExchangeRates("EUR", [
                    "USD",
                    "GBP",
                ]) as unknown) as AnyAction
            )
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it("dispatches EXCHANGE_RATES_FAILURE if fetching rates is unsuccesful", () => {
        const exchangeRatesData = {
            rates: { USD: 1.1769, GBP: 0.89755 },
            base: "EUR",
        };
        moxios.stubRequest("/latest?base=EUR&symbols=USD,GBP", {
            status: 429,
            response: {},
        });

        const expectedActions = [
            { type: ExchangeRateActionTypes.EXCHANGE_RATES_BEGIN },
            {
                type: ExchangeRateActionTypes.EXCHANGE_RATES_FAILURE,
            },
        ];

        return store
            .dispatch(
                (fetchExchangeRates("EUR", [
                    "USD",
                    "GBP",
                ]) as unknown) as AnyAction
            )
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });
});
