import apiHandler from "./webService";
import { AxiosResponse } from "axios";

const getExchangeRates = async (
    base: string,
    targets?: string[]
): Promise<AxiosResponse> => {
    const targetParam = targets?.filter((t) => t !== base).join(",");
    const response = await apiHandler.get("/latest", {
        params: {
            base,
            symbols: targetParam,
        },
    });
    // if (process.env.REACT_APP_ENABLE_MOCK_RATE_CHANGE) {
    //     var randomPercent = (Math.random() * 10) / 100;
    //     Object.keys(response.data.rates).forEach((key) => {
    //         response.data.rates[key] +=
    //             response.data.rates[key] * randomPercent;
    //     });
    // }
    return response;
};

export { getExchangeRates };
