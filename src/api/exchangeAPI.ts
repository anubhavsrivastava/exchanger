import apiHandler from "./webService";

const getExchangeRates = (base: string, targets?: string[]): Promise<void> => {
    return apiHandler.instance.get("/latest", {
        base,
        symbols: targets?.join(","),
    });
};

getExchangeRates("USD");
export { getExchangeRates };
