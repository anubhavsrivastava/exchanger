import React, { Component } from "react";
import { connect } from "react-redux";
import DefaultLayout from "../../components/Layout/DefaultLayout";
import Button from "../../components/Button";
import ExchangePanel from "../../components/ExchangePanel";
import exchangeStyles from "./exchange.module.scss";
import swapIcon from "../../static/images/swap.svg";
import trendIcon from "../../static/images/spike.svg";
import { WalletState } from "../../reducers/walletReducer";
import { ExchangeRateState } from "../../reducers/exchangeRateReducer";
import { Currency } from "../../models/currency";
import { executeWalletTransaction } from "../../actions/walletActions";
import { fetchExchangeRates } from "../../actions/ExchangeRateAction";
const options = ["EUR", "USD", "GBP"];
class CurrencyExchange extends Component {
    state: { source: Currency; target: Currency };
    props: any;
    constructor(props: any) {
        super(props);
        this.state = {
            source: { code: "EUR", value: 0 },
            target: { code: "USD", value: 0 },
        };
        this.onSourceChange = this.onSourceChange.bind(this);
        this.onTargetChange = this.onTargetChange.bind(this);
        this.onSwitch = this.onSwitch.bind(this);
        this.onAmountChange = this.onAmountChange.bind(this);
        this.onExchange = this.onExchange.bind(this);
    }
    componentDidMount() {
        this.props.getExchangeRates("EUR", options);
    }

    onSourceChange = (newSource: string) => {
        this.setState({ source: { ...this.state.source, code: newSource } });
    };

    onTargetChange = (newTarget: string) => {
        this.setState({ target: { ...this.state.target, code: newTarget } });
    };

    onAmountChange = (type: "source" | "target", amount: number) => {
        const { rates } = this.props;
        const { source, target } = this.state;
        const exchangeRate = rates[target.code] / rates[source.code];

        if (type === "source") {
            this.setState({
                target: { ...this.state.target, value: amount * exchangeRate },
            });
        } else {
            this.setState({
                source: {
                    ...this.state.source,
                    value: (amount * 1) / exchangeRate,
                },
            });
        }
        this.setState({ [type]: { ...this.state[type], value: amount } });
    };

    onSwitch = () => {
        this.setState({ target: this.state.source, source: this.state.target });
    };

    onExchange = (source: Currency, targetCode: string) => {
        const { executeWalletTransaction, rates } = this.props;
        const exchangeRate = rates[targetCode] / rates[source.code];

        executeWalletTransaction(source, {
            code: targetCode,
            value: source.value * exchangeRate,
        });
    };

    render() {
        const { wallet, rates } = this.props;
        const { source, target } = this.state;
        const exchangeRate = rates[target.code] / rates[source.code];
        return (
            <DefaultLayout
                header={<h2>Currency Exchange</h2>}
                footer={
                    <Button
                        onClick={() => this.onExchange(source, target.code)}
                    >
                        Exchange
                    </Button>
                }
            >
                <ExchangePanel
                    options={options}
                    currentCurrency={source.code}
                    onCurrencyChange={this.onSourceChange}
                    onAmountChange={(value: number) =>
                        this.onAmountChange("source", value)
                    }
                    currentAmount={source.value}
                    currentBalance={wallet[source.code].value}
                />
                <div className={exchangeStyles.panelSeperator}>
                    <div
                        className={`${exchangeStyles.circleContainer} ${exchangeStyles.circleContainerSmall} ${exchangeStyles.containerLeft} ${exchangeStyles.circleContainerButton}`}
                    >
                        <img
                            onClick={this.onSwitch}
                            src={swapIcon}
                            alt="Switch Currency"
                        />
                    </div>
                    <div className={exchangeStyles.circleContainer}>
                        <img src={trendIcon} alt="rate" />
                        <span className="text text-contained text-primary">
                            {`1 ${source.code} = ${exchangeRate.toFixed(2)} ${
                                target.code
                            }`}
                        </span>
                    </div>
                    {/* <div className={`${exchangeStyles.containerRight}`}></div> */}
                </div>
                <ExchangePanel
                    options={options}
                    currentCurrency={target.code}
                    onCurrencyChange={this.onTargetChange}
                    onAmountChange={(value: number) =>
                        this.onAmountChange("target", value)
                    }
                    currentAmount={target.value}
                    currentBalance={wallet[target.code].value}
                    color="grey"
                />
            </DefaultLayout>
        );
    }
}

const mapStateToProps = ({
    walletDetails,
    exchangeRate,
}: {
    walletDetails: WalletState;
    exchangeRate: ExchangeRateState;
}) => ({
    wallet: walletDetails.wallet,
    rates: exchangeRate.rates,
});

const mapDispatchToProps = (dispatch: any) => ({
    executeWalletTransaction: (source: Currency, target: Currency) =>
        dispatch(executeWalletTransaction(source, target)),
    getExchangeRates: (base: string, target: []) => {
        dispatch(fetchExchangeRates(base, target));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(CurrencyExchange);
