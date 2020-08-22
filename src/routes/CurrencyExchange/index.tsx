import React, { FC, useEffect } from "react";
import classnames from "classnames";
import DefaultLayout from "../../components/Layout/DefaultLayout";
import Button from "../../components/Button";
import ExchangePanel from "../../components/ExchangePanel";
import exchangeStyles from "./exchange.module.scss";
import swapIcon from "../../static/images/swap.svg";
import { useDispatch } from "react-redux";
import { executeWalletTransaction } from "../../actions/walletActions";
import { fetchExchangeRates } from "../../actions/exchangeRateActions";
import useWallet from "./hooks/useWallet";
import useCurrencyExchange from "./hooks/useCurrencyExchange";
import RateIndicator from "../../components/Indicator";

const EXCHANGE_RATE_UPDATE_INTERVAL = +process.env
    .REACT_APP_EXCHANGE_RATE_UPDATE_INTERVAL;

const currencies = ["EUR", "USD", "GBP"];
const defaultCurrency = currencies[0];

const CurrencyExchange: FC = () => {
    const dispatch = useDispatch();
    const { getWalletBalance } = useWallet();
    const {
        source,
        target,
        updateSourceCurrency,
        updateTargetCurrency,
        updateSourceAmount,
        updateTargetAmount,
        onSwitch,
        getExchangeAmount,
        canExchangeCurrency,
    } = useCurrencyExchange({
        currencies,
        defaultCurrency,
    });

    useEffect(() => {
        dispatch(fetchExchangeRates(defaultCurrency, currencies));

        const handleID = setInterval(() => {
            dispatch(fetchExchangeRates(defaultCurrency, currencies));
        }, EXCHANGE_RATE_UPDATE_INTERVAL);

        return () => {
            clearInterval(handleID);
        };
    }, [dispatch]);

    const exchangeRate = getExchangeAmount(target, source, 1);

    const performExchange = () => {
        dispatch(
            executeWalletTransaction(source, {
                code: target.code,
                value: getExchangeAmount(target, source, source.value),
            })
        );

        updateSourceAmount(0);
    };

    const isExchangeAvailable =
        source.value <= getWalletBalance(source.code) && canExchangeCurrency();

    return (
        <DefaultLayout
            header={<h2>Exchange Point</h2>}
            footer={
                <Button
                    disabled={!isExchangeAvailable}
                    onClick={performExchange}
                >
                    Exchange
                </Button>
            }
        >
            <ExchangePanel
                options={currencies}
                currentCurrency={source.code}
                currentAmount={source.value}
                onAmountChange={updateSourceAmount}
                autoFocus={true}
                onCurrencyChange={updateSourceCurrency}
                currentBalance={getWalletBalance(source.code)}
                warnBalance={true}
                prefix="plus"
            />
            <div className={exchangeStyles.panelSeperator}>
                <div
                    className={classnames(
                        exchangeStyles.circleContainer,
                        exchangeStyles.circleContainerSmall,
                        exchangeStyles.containerLeft,
                        exchangeStyles.circleContainerButton
                    )}
                    onClick={onSwitch}
                >
                    <img src={swapIcon} alt="Switch Currency" />
                </div>
                <RateIndicator
                    source={source}
                    target={target}
                    exchangeRate={exchangeRate}
                    rootClass={`${exchangeStyles.circleContainer}`}
                />
            </div>
            <ExchangePanel
                options={currencies}
                currentCurrency={target.code}
                currentAmount={target.value}
                currentBalance={getWalletBalance(target.code)}
                onAmountChange={updateTargetAmount}
                onCurrencyChange={updateTargetCurrency}
                color="grey"
                prefix="minus"
            />
        </DefaultLayout>
    );
};

export default CurrencyExchange;
