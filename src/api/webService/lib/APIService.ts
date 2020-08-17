import defaultProvider, { defaultConfiguration } from "./adapter";

export default class APIService {
    provider: typeof defaultProvider;
    instance: any;
    constructor(config: typeof defaultConfiguration) {
        this.provider = defaultProvider;
        this.instance = this.provider.create(
            Object.assign({}, defaultConfiguration, config)
        );
    }
}
