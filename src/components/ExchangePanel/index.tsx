import React, { FC } from "react";
import Dropdown from "react-dropdown";
import panelStyles from "./panel.module.scss";
import classnames from "classnames";

type Props = {
    color?: "white" | "grey";
    currencies?: any[]; //todo
    [key: string]: any;
};

const ExchangePanel: FC<Props> = ({
    color = "white",
    options = [],
    currentCurrency = undefined,
    onCurrencyChange = () => {},
    onAmountChange = () => {},
    currentAmount = 0,
    currentBalance = 0,
}) => {
    currentCurrency =
        currentCurrency === undefined ? options[0] : currentCurrency;
    return (
        <div
            className={classnames(
                panelStyles.panel,
                panelStyles[`${color}-panel`]
            )}
        >
            <div className={panelStyles.panelRow}>
                <Dropdown
                    options={options}
                    value={currentCurrency}
                    placeholder="Select an option"
                    onChange={({ value }): void => {
                        onCurrencyChange(value);
                    }}
                />
                <input
                    onChange={(e) => onAmountChange(e.target.value)}
                    type="text"
                    value={currentAmount}
                    placeholder="0"
                    className="input-huge"
                />
            </div>
            <div
                className={classnames(
                    "text",
                    "text-grey",
                    panelStyles.panelRow
                )}
            >
                {`Balance: ${currentBalance} ${currentCurrency}`}
            </div>
        </div>
    );
};

export default ExchangePanel;
