import apiHandler from "./webService";
import { AxiosResponse } from "axios";

const getExchangeRates = (
    base: string,
    targets?: string[]
): Promise<AxiosResponse> => {
    const targetParam = targets?.filter((t) => t !== base).join(",");
    return apiHandler.get("/latest", {
        params: {
            base,
            symbols: targetParam,
        },
    });
};

export { getExchangeRates };
