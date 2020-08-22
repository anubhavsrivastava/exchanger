import moxios from "moxios";
import { getExchangeRates } from "../exchangeAPI";

describe("WebApiHandler", () => {
    beforeEach(function () {
        moxios.install();
    });

    afterEach(function () {
        moxios.uninstall();
    });
    it("Should pass respected params to API", async () => {
        const ratesAPIResponse = {
            rates: { USD: 1, GBP: 1 },
        };
        moxios.stubRequest(/latest.*/, {
            status: 200,
            response: ratesAPIResponse,
        });

        const response = await getExchangeRates("EUR", ["USD", "GBP"]);
        expect(response.config.params).toStrictEqual({
            base: "EUR",
            symbols: "USD,GBP",
        });
    });
});
