import apiHandler from "./webService";

const getExchangeRates = (base: string, targets?: string[]): Promise<void> => {
    return apiHandler.get("/latest", {
        params: {
            base,
            symbols: targets?.join(","),
        },
    });
};

export { getExchangeRates };
