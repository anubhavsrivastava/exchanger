import axios from "axios";

import {
    responseConsoleLogger,
    responseConsoleErrorLogger,
} from "./interceptors/responseConsoleLogger";

axios.defaults.baseURL = `${process.env.REACT_APP_EXCHANGE_API_URL}`;
axios.defaults.timeout = 300000;

if (process.env.REACT_APP_ENABLE_WEBAPI_LOGGING === "true") {
    axios.interceptors.response.use(
        responseConsoleLogger,
        responseConsoleErrorLogger
    );
}

export default axios;
