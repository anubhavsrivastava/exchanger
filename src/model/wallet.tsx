import { Currency } from "./currency";

export type Wallet = {
    [key: string]: Currency;
};
