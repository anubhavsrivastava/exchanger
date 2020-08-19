import React, { FC } from "react";
import Dropdown, { Option } from "react-dropdown";
import panelStyles from "./panel.module.scss";

type Props = {
    color?: "white" | "grey";
    currencies?: any[]; //todo

    // onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    // type?: "button" | "submit" | "reset";
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
            className={`${panelStyles.panel} ${panelStyles[`${color}-panel`]}`}
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
            <div className={`text-grey text ${panelStyles.panelRow}`}>
                {`Balance: ${currentBalance} ${currentCurrency}`}
            </div>
        </div>
    );
};

export default ExchangePanel;
