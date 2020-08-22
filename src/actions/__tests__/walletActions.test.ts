import { WalletActionTypes } from "../actionTypes";
import configureMockStore from "redux-mock-store";
import reduxThunk from "redux-thunk";
import { executeWalletTransaction } from "../walletActions";
import { AnyAction } from "redux";
import { Currency } from "../../models/currency";
const middlewares = [reduxThunk];
const mockStore = configureMockStore(middlewares);

describe("wallet Actions", () => {
    it("dispatches EXCHANGE_SUCCESS after successful executeWalletTransaction", async () => {
        const store = mockStore({ walletDetails: {} });
        const sourceCurrency: Currency = { code: "EUR", value: 1 };
        const targetCurrency: Currency = { code: "USD", value: 1 };

        const expectedActions = [
            {
                type: WalletActionTypes.EXCHANGE_BEGIN,
            },
            {
                type: WalletActionTypes.EXCHANGE_SUCCESS,
                payload: { sourceCurrency, targetCurrency },
            },
        ];

        store.dispatch(
            (executeWalletTransaction(
                sourceCurrency,
                targetCurrency
            ) as unknown) as AnyAction
        );
        expect(store.getActions()).toEqual(expectedActions);
    });
});
