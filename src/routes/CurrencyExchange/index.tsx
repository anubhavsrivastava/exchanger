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

const EXCHANGE_RATE_UPDATE_INTERVAL: number = 5000;

const currencies = ["EUR", "USD", "GBP"];
const defaultCurrency = "EUR";
const CurrencyExchange: FC = () => {
    const dispatch = useDispatch();
    const { wallet } = useWallet();
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
        source.value <= wallet[source.code].value && canExchangeCurrency();

    return (
        <DefaultLayout
            header={<h2>Currency Exchange</h2>}
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
                currentBalance={wallet[source.code].value}
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
                currentBalance={wallet[target.code].value}
                onAmountChange={updateTargetAmount}
                onCurrencyChange={updateTargetCurrency}
                color="grey"
                prefix="minus"
            />
        </DefaultLayout>
    );
};
// class CurrencyExchange extends Component {
//     state: { source: Currency; target: Currency };
//     props: any;
//     constructor(props: any) {
//         super(props);
//         this.state = {
//             source: { code: options[0], value: 0 },
//             target: { code: options[1], value: 0 },
//         };
//         this.onSourceChange = this.onSourceChange.bind(this);
//         this.onTargetChange = this.onTargetChange.bind(this);
//         this.onSwitch = this.onSwitch.bind(this);
//         this.onAmountChange = this.onAmountChange.bind(this);
//         this.onExchange = this.onExchange.bind(this);
//     }
//     componentDidMount() {
//         this.props.getExchangeRates("EUR", options);
//     }

//     onSourceChange = (newSource: string) => {
//         this.setState({ source: { ...this.state.source, code: newSource } });
//     };

//     onTargetChange = (newTarget: string) => {
//         this.setState({ target: { ...this.state.target, code: newTarget } });
//     };

//     onAmountChange = (type: "source" | "target", amount: number) => {
//         const { rates } = this.props;
//         const { source, target } = this.state;
//         const exchangeRate = rates[target.code] / rates[source.code];

//         if (type === "source") {
//             this.setState({
//                 target: { ...this.state.target, value: amount * exchangeRate },
//             });
//         } else {
//             this.setState({
//                 source: {
//                     ...this.state.source,
//                     value: (amount * 1) / exchangeRate,
//                 },
//             });
//         }
//         this.setState({ [type]: { ...this.state[type], value: amount } });
//     };

//     onSwitch = () => {
//         this.setState({ target: this.state.source, source: this.state.target });
//     };

//     onExchange = (source: Currency, targetCode: string) => {
//         const { executeWalletTransaction, rates } = this.props;
//         const exchangeRate = rates[targetCode] / rates[source.code];

//         executeWalletTransaction(source, {
//             code: targetCode,
//             value: source.value * exchangeRate,
//         });
//     };

//     render() {
//         const { wallet, rates } = this.props;
//         const { source, target } = this.state;
//         const exchangeRate = rates[target.code] / rates[source.code];
//         return (
//             <DefaultLayout
//                 header={<h2>Currency Exchange</h2>}
//                 footer={
//                     <Button
//                         onClick={() => this.onExchange(source, target.code)}
//                     >
//                         Exchange
//                     </Button>
//                 }
//             >
//                 <ExchangePanel
//                     options={options}
//                     currentCurrency={source.code}
//                     onCurrencyChange={this.onSourceChange}
//                     onAmountChange={(value: number) =>
//                         this.onAmountChange("source", value)
//                     }
//                     currentAmount={source.value}
//                     currentBalance={wallet[source.code].value}
//                 />
//                 <div className={exchangeStyles.panelSeperator}>
//                     <div
//                         className={classnames(
//                             exchangeStyles.circleContainer,
//                             exchangeStyles.circleContainerSmall,
//                             exchangeStyles.containerLeft,
//                             exchangeStyles.circleContainerButton
//                         )}
//                     >
//                         <img
//                             onClick={this.onSwitch}
//                             src={swapIcon}
//                             alt="Switch Currency"
//                         />
//                     </div>
//                     <div className={exchangeStyles.circleContainer}>
//                         <img src={trendIcon} alt="rate" />
//                         <span
//                             className={classnames(
//                                 "text",
//                                 "text-contained",
//                                 "text-primary"
//                             )}
//                         >
//                             {`1 ${source.code} = ${exchangeRate.toFixed(2)} ${
//                                 target.code
//                             }`}
//                         </span>
//                     </div>
//                 </div>
//                 <ExchangePanel
//                     options={options}
//                     currentCurrency={target.code}
//                     onCurrencyChange={this.onTargetChange}
//                     onAmountChange={(value: number) =>
//                         this.onAmountChange("target", value)
//                     }
//                     currentAmount={target.value}
//                     currentBalance={wallet[target.code].value}
//                     color="grey"
//                 />
//             </DefaultLayout>
//         );
//     }
// }

export default CurrencyExchange;
