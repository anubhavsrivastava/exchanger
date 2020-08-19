import apiHandler from "./webService";
import { AxiosResponse } from "axios";

const getExchangeRates = (
    base: string,
    targets?: string[]
): Promise<AxiosResponse> => {
    return apiHandler.get("/latest", {
        params: {
            base,
            symbols: targets?.join(","),
        },
    });
};

export { getExchangeRates };
