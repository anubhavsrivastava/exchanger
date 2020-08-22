import webService from "../webService";

describe("WebApiHandler", () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
        jest.resetModules(); // most important - it clears the cache
        process.env = { ...OLD_ENV }; // make a copy
    });

    afterAll(() => {
        process.env = OLD_ENV; // restore old env
    });
    it("Should return default configuration for apiHandler", () => {
        process.env.REACT_APP_EXCHANGE_API_URL = "https://localhost";
        const webAPIHandler = require("../webService").default;
        expect(webAPIHandler.defaults.timeout).toBe(
            webService.defaults.timeout
        );
        expect(webAPIHandler.defaults.baseURL).toBe(
            process.env.REACT_APP_EXCHANGE_API_URL
        );
    });

    it("Should return apiHandler with interceptors if configured", () => {
        process.env.REACT_APP_EXCHANGE_API_URL = "https://localhost";
        process.env.REACT_APP_ENABLE_WEBAPI_LOGGING = "true";
        const webAPIHandler = require("../webService").default;
        expect(webAPIHandler.defaults.timeout).toBe(
            webService.defaults.timeout
        );
        expect(webAPIHandler.defaults.baseURL).toBe(
            process.env.REACT_APP_EXCHANGE_API_URL
        );
        expect(webAPIHandler.interceptors.response.handlers.length).toBe(1);
    });
});
