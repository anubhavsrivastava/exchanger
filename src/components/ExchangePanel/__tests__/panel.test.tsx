import * as React from "react";
import ExchangePanel from "../index";
import { render } from "@testing-library/react";
import user from "@testing-library/user-event";

describe("<ExchangePanel /> Component", () => {
    beforeEach(() => {
        //ignore Dropdown UNSAFE method logs
        console.warn = () => {};
    });
    it("renders a button with primary class and type", () => {
        const { container } = render(
            <ExchangePanel
                currentAmount={12}
                currentCurrency={"EUR"}
                options={["EUR", "USD"]}
            />
        );

        let selectedOption = container.querySelector(".is-selected");
        expect(selectedOption?.innerHTML).toBe("EUR");
        let input = container.querySelector("input");
        expect(input).toHaveAttribute("class", "input-huge inputFieldSmall");
        expect(input).toHaveAttribute("value", "12");
        expect(input).toHaveAttribute("type", "text");
        let balance = container.querySelector(".panelText");
        expect(balance?.innerHTML).toBe("Balance: 0 EUR");
    });

    it("renders a button with primary class and additional props", () => {
        const { container } = render(
            <ExchangePanel
                currentAmount={12}
                currentCurrency={"EUR"}
                options={["EUR", "USD"]}
                prefix={"plus"}
                color={"grey"}
            />
        );

        let panel = container.querySelector(".panel");
        expect(panel).toHaveClass("grey-panel");

        let input = container.querySelector("input");
        expect(input?.parentNode).toHaveAttribute("class", "prefixPlus");
    });

    it("renders a button and events are called via callbacks", () => {
        const onAmountChange = jest.fn();
        const { container } = render(
            <ExchangePanel
                currentAmount={12}
                currentCurrency={"EUR"}
                options={["EUR", "USD"]}
                onAmountChange={onAmountChange}
            />
        );

        let input = container.querySelector("input") as HTMLInputElement;
        user.type(input, "10");
        expect(onAmountChange).toHaveBeenCalled();
        // expect(input?.parentNode).toHaveAttribute("class", "prefixPlus");
    });
});
