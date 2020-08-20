/// <reference types="react-scripts" />
declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: "development" | "production" | "test";
        REACT_APP_ENABLE_DEVTOOLS: string;
        REACT_APP_ENABLE_WEBAPI_LOGGING: string;
        REACT_APP_EXCHANGE_API_URL: string;
        REACT_APP_EXCHANGE_RATE_UPDATE_INTERVAL: string;
    }
}
