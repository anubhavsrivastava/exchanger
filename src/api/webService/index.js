import APIService from './lib/APIService';
import { responseConsoleLogger, responseConsoleErrorLogger } from './interceptors/responseConsoleLogger';
import { axiosResponseDataUnpacker } from 'axios-data-unpacker';


const AppConfiguration = {
	timeout: 300000,
	baseURL: `${process.env.REACT_APP_EXCHANGE_API_URL}`
};

const ApiServiceDefaultInstance = new APIService(AppConfiguration);

if (process.env.REACT_APP_ENABLE_WEBAPI_LOGGING === 'true') {
	ApiServiceDefaultInstance.instance.interceptors.response.use(responseConsoleLogger, responseConsoleErrorLogger);
}

// after adding other response interceptors
axiosResponseDataUnpacker(ApiServiceDefaultInstance.instance)

export default ApiServiceDefaultInstance;
