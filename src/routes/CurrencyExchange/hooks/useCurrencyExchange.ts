import { useSelector, shallowEqual } from "react-redux";
import { StoreState } from "../../../store/initialState";
import { Currency } from "../../../models/currency";
import { useState } from "react";

const useCurrencyExchange = ({
    currencies,
    defaultCurrency,
}: {
    currencies: string[];
    defaultCurrency: string;
}) => {
    const { rates } = useSelector(
        (state: StoreState) => ({
            rates: state.exchangeRate.rates,
        }),
        shallowEqual
    );

    const [source, updateSource] = useState<Currency>({
        code: defaultCurrency,
        value: 0,
    });

    const [target, updateTarget] = useState<Currency>({
        code: currencies[1],
        value: 0,
    });

    const getExchangeAmount = function (
        fromCurrency: Currency,
        toCurrency: Currency,
        amount: number
    ): number {
        const fromRate = rates[toCurrency.code];
        const toRate = rates[fromCurrency.code];
        if (!fromRate || !toRate) {
            return -1;
        }

        const exchangePrice = (amount * (toRate / fromRate)).toFixed(2);
        return +exchangePrice;
    };

    const onSwitch = function () {
        let prevSource = source;
        updateSource(target);
        updateTarget(prevSource);
    };

    const updateSourceAmount = (amount: number) => {
        const exchangeRate = getExchangeAmount(target, source, amount);
        updateSource({ ...source, value: amount });
        updateTarget({ ...target, value: exchangeRate });
    };

    const updateTargetAmount = (amount: number) => {
        const exchangeRate = getExchangeAmount(source, target, amount);
        updateSource({ ...source, value: exchangeRate });
        updateTarget({ ...target, value: amount });
    };

    const updateSourceCurrency = (code: string) => {
        const newSource = { ...source, code };
        updateSource(newSource);

        updateTarget({
            ...target,
            value: getExchangeAmount(target, newSource, newSource.value),
        });
    };

    const updateTargetCurrency = (code: string) => {
        const newTarget = { ...target, code };

        updateTarget(newTarget);
        updateSource({
            ...source,
            value: getExchangeAmount(source, newTarget, newTarget.value),
        });
    };

    const canExchangeCurrency = (): boolean => {
        return source.code !== target.code && source.value > 0;
    };

    return {
        rates,
        source,
        target,
        updateSourceAmount,
        updateTargetAmount,
        updateSourceCurrency,
        updateTargetCurrency,
        onSwitch,
        getExchangeAmount,
        canExchangeCurrency,
    };
};

export default useCurrencyExchange;
