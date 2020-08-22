import * as React from "react";
import Indicator from "../index";
import { render } from "@testing-library/react";

describe("<RateIndicator /> Component", () => {
    it("renders a RateIndicator with sanity values", () => {
        const { container } = render(
            <Indicator
                rootClass={"indicator"}
                source={{ code: "EUR", value: 11 }}
                target={{ code: "USD", value: 1 }}
                exchangeRate={2}
            />
        );

        let indicator = container.querySelector(".indicator");
        expect(indicator).toHaveAttribute("class", "indicator");
        let rateContent = container.querySelector(".rateContent");
        expect(rateContent?.textContent).toBe("1 EUR = 2.00 USD");
    });

    it("renders Fetching rate text with no exchange rate", () => {
        const { container } = render(
            <Indicator
                rootClass={"indicator"}
                source={{ code: "EUR", value: 1 }}
                target={{ code: "USD", value: 1 }}
                exchangeRate={0}
            />
        );

        let indicator = container.querySelector(".indicator");
        expect(indicator).toHaveAttribute("class", "indicator");
        let rateContent = container.querySelector(".rateContent");
        expect(rateContent?.textContent).toBe("Fetching Rate...");
    });
});
