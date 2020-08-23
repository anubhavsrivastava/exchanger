import React from "react";
import CurrencyExchange from "../index";
import configureMockStore, { MockStore } from "redux-mock-store";
import { render, act } from "@testing-library/react";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import user from "@testing-library/user-event";
import appReducer from "../../../reducers";

const createState = (initialState: any) => (actions: any) =>
    actions.reduce(appReducer, initialState);
const middlewares = [reduxThunk];

const mockStore = configureMockStore(middlewares);

//ignore third-party Dropdown UNSAFE method logs
console.warn = (() => {
    const _o = console.warn.bind(console);
    return (...args: []) => {
        args[args.length - 1] !== "Dropdown" && _o(...args);
    };
})();

describe("CurrencyExchange Route", () => {
    let store: MockStore | undefined;
    let component: Element;
    const mockStoreState = {
        walletDetails: {
            wallet: {
                EUR: { code: "EUR", value: 1000 },
                GBP: { code: "GBP", value: 500 },
                USD: { code: "USD", value: 800 },
            },
        },
        exchangeRate: { rates: { EUR: 1, USD: 1.5, GBP: 2 } },
    };
    beforeEach(function () {
        const initialState = createState(mockStoreState);
        store = mockStore(initialState);
        const { container } = render(
            <Provider store={store}>
                <CurrencyExchange />
            </Provider>
        );
        component = container;
    });

    afterEach(function () {
        store = undefined;
    });

    it("can render with defaults", () => {
        const sourceInput = component?.querySelector(".white-panel input");
        const targetInput = component?.querySelector(".grey-panel input");
        expect(sourceInput).toHaveAttribute("value", "");
        expect(targetInput).toHaveAttribute("value", "");
    });

    it("update target amount on user source amount change with respect to rate'", () => {
        const sourceInput = component.querySelector(
            ".white-panel input"
        ) as HTMLInputElement;
        const targetInput = component?.querySelector(".grey-panel input");
        user.type(sourceInput, "10");

        expect(targetInput).toHaveAttribute("value", "15");
    });

    it("update source amount on user target amount change with respect to rate'", () => {
        const sourceInput = component.querySelector(
            ".white-panel input"
        ) as HTMLInputElement;
        const targetInput = component?.querySelector(
            ".grey-panel input"
        ) as HTMLInputElement;
        user.type(targetInput, "30");

        expect(sourceInput).toHaveAttribute("value", "20");
    });

    it("balance for source and target currency are as expected", () => {
        const sourceBalance = component.querySelector(
            ".white-panel .panelText"
        ) as HTMLElement;

        const targetBalance = component.querySelector(
            ".grey-panel .panelText"
        ) as HTMLElement;

        expect(sourceBalance?.innerHTML).toBe(
            `Balance: ${mockStoreState.walletDetails.wallet.EUR.value} EUR`
        );
        expect(targetBalance?.innerHTML).toBe(
            `Balance: ${mockStoreState.walletDetails.wallet.USD.value} USD`
        );
    });

    it("update source balance on user currency change'", () => {
        const sd = component.querySelector(
            ".white-panel .Dropdown-control"
        ) as HTMLElement;

        act(() => user.click(sd));
        const sdOptions = component.querySelectorAll(
            ".white-panel .Dropdown-menu .Dropdown-option"
        );

        act(() => user.click(sdOptions[1]));

        const sourceBalance = component.querySelector(
            ".white-panel .panelText"
        ) as HTMLElement;

        expect(sourceBalance?.innerHTML).toBe(
            `Balance: ${mockStoreState.walletDetails.wallet.USD.value} USD`
        );
    });

    it("update target balance on user currency change'", () => {
        const td = component.querySelector(
            ".grey-panel .Dropdown-control"
        ) as HTMLElement;

        act(() => user.click(td));
        const tdOptions = component.querySelectorAll(
            ".grey-panel .Dropdown-menu .Dropdown-option"
        );

        act(() => user.click(tdOptions[0]));

        const targetBalance = component.querySelector(
            ".grey-panel .panelText"
        ) as HTMLElement;

        expect(targetBalance?.innerHTML).toBe(
            `Balance: ${mockStoreState.walletDetails.wallet.EUR.value} EUR`
        );
    });

    it("update exchange rate on user source currency change'", () => {
        const sd = component.querySelector(
            ".white-panel .Dropdown-control"
        ) as HTMLElement;

        act(() => user.click(sd));
        const sdOptions = component.querySelectorAll(
            ".white-panel .Dropdown-menu .Dropdown-option"
        );

        const rate = component.querySelector(".rateContent");
        expect(rate?.innerHTML).toBe(
            `1 EUR = ${mockStoreState.exchangeRate.rates.USD.toFixed(2)} USD`
        );
        act(() => user.click(sdOptions[2]));

        expect(rate?.innerHTML).toBe(
            `1 GBP = ${(
                mockStoreState.exchangeRate.rates.USD /
                mockStoreState.exchangeRate.rates.GBP
            ).toFixed(2)} USD`
        );
    });

    it("update exchange rate on user target currency change'", () => {
        const td = component.querySelector(
            ".grey-panel .Dropdown-control"
        ) as HTMLElement;

        act(() => user.click(td));
        const sdOptions = component.querySelectorAll(
            ".grey-panel .Dropdown-menu .Dropdown-option"
        );

        const rate = component.querySelector(".rateContent");
        expect(rate?.innerHTML).toBe(
            `1 EUR = ${mockStoreState.exchangeRate.rates.USD.toFixed(2)} USD`
        );
        act(() => user.click(sdOptions[2]));

        expect(rate?.innerHTML).toBe(
            `1 EUR = ${mockStoreState.exchangeRate.rates.GBP.toFixed(2)} GBP`
        );
    });

    it("change in source currency should change the target amount", () => {
        const sd = component.querySelector(
            ".white-panel .Dropdown-control"
        ) as HTMLElement;

        act(() => user.click(sd));
        const sdOptions = component.querySelectorAll(
            ".white-panel .Dropdown-menu .Dropdown-option"
        );

        const sourceInput = component.querySelector(
            ".white-panel input"
        ) as HTMLInputElement;
        const targetInput = component?.querySelector(".grey-panel input");
        user.type(sourceInput, "20");
        expect(targetInput).toHaveAttribute("value", "30");
        act(() => user.click(sdOptions[2]));
        expect(targetInput).toHaveAttribute("value", "15");
    });

    it("change in target currency should change the source amount", () => {
        const td = component.querySelector(
            ".grey-panel .Dropdown-control"
        ) as HTMLElement;

        act(() => user.click(td));
        const tdOptions = component.querySelectorAll(
            ".grey-panel .Dropdown-menu .Dropdown-option"
        );

        const targetInput = component.querySelector(
            ".grey-panel input"
        ) as HTMLInputElement;
        const sourceInput = component?.querySelector(".white-panel input");
        user.type(targetInput, "30");
        expect(sourceInput).toHaveAttribute("value", "20");
        act(() => user.click(tdOptions[2]));
        expect(sourceInput).toHaveAttribute("value", "15");
    });

    it("updated wallet on succesful transaction", async () => {
        const sourceInput = component.querySelector(
            ".white-panel input"
        ) as HTMLInputElement;
        user.type(sourceInput, "100");

        const targetInput = component.querySelector(
            ".grey-panel input"
        ) as HTMLInputElement;

        const expectTargetChange = targetInput.value;

        const exchangeButton = component.querySelector(
            ".footer .button"
        ) as HTMLButtonElement;

        user.click(exchangeButton);
        const sourceBalance = component.querySelector(
            ".white-panel .panelText"
        ) as HTMLElement;
        expect(sourceBalance?.innerHTML).toBe(
            `Balance: ${
                mockStoreState.walletDetails.wallet.EUR.value - 100
            } EUR`
        );

        const targetBalance = component.querySelector(
            ".grey-panel .panelText"
        ) as HTMLElement;
        expect(targetBalance?.innerHTML).toBe(
            `Balance: ${
                mockStoreState.walletDetails.wallet.USD.value +
                +expectTargetChange
            } USD`
        );
    });
});
