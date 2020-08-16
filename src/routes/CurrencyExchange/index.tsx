import React, { Component } from "react";
import DefaultLayout from "../../components/Layout/DefaultLayout";
import Button from "../../components/Button";
import ExchangePanel from "../../components/ExchangePanel";
import exchangeStyles from "./exchange.module.scss";
import swapIcon from "../../static/images/swap.svg";
import trendIcon from "../../static/images/spike.svg";
export default class CurrencyExchange extends Component {
    render() {
        return (
            <DefaultLayout
                header={<h2>Currency Exchange</h2>}
                footer={<Button>Exchange</Button>}
            >
                <ExchangePanel />
                <div className={exchangeStyles.panelSeperator}>
                    <div
                        className={`${exchangeStyles.circleContainer} ${exchangeStyles.circleContainerSmall} ${exchangeStyles.containerLeft}`}
                    >
                        <img src={swapIcon} alt="Swap Currency" />
                    </div>
                    <div className={exchangeStyles.circleContainer}>
                        <img src={trendIcon} alt="rate" />
                        <span className="text text-contained text-primary">
                            1 Euro = 1 INR
                        </span>
                    </div>
                    {/* <div className={`${exchangeStyles.containerRight}`}></div> */}
                </div>
                <ExchangePanel color="grey" />
            </DefaultLayout>
        );
    }
}
