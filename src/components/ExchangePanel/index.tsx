import React, { FC, BaseSyntheticEvent } from "react";
import Dropdown from "react-dropdown";
import panelStyles from "./panel.module.scss";
import classnames from "classnames";

interface Props {
    color?: "white" | "grey";
    autoFocus?: boolean;
    currencies?: any[]; //todo
    [key: string]: any;
}

const IS_POSITIVE_NUMBER_REGEX = new RegExp(/^\d*\.?\d{0,2}$/);

const ExchangePanel: FC<Props> = ({
    autoFocus,
    color = "white",
    options = [],
    currentCurrency = undefined,
    onCurrencyChange = () => {},
    onAmountChange = () => {},
    currentAmount = 0,
    currentBalance = 0,
    maxValue = 10e6,
    warnBalance = false,
    prefix,
}) => {
    currentCurrency =
        currentCurrency === undefined ? options[0] : currentCurrency;

    const onInputChange = (e: BaseSyntheticEvent) => {
        let value = e?.target?.value;

        if (!IS_POSITIVE_NUMBER_REGEX.test(value) || +value > maxValue) {
            return;
        }

        onAmountChange(value);
    };

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
                <div
                    className={classnames({
                        [panelStyles.prefixMinus]:
                            prefix === "minus" && currentAmount,
                        [panelStyles.prefixPlus]:
                            prefix === "plus" && currentAmount,
                    })}
                >
                    <input
                        className={classnames(
                            "input-huge",
                            panelStyles.inputFieldSmall,
                            {
                                [panelStyles.inputFieldLarge]:
                                    currentAmount.toString().length > 5,
                            }
                        )}
                        onChange={onInputChange}
                        type="text"
                        pattern="[0-9]"
                        value={currentAmount || ""}
                        placeholder="0"
                        autoFocus={autoFocus}
                    />
                </div>
            </div>
            <div className={panelStyles.panelRow}>
                <span
                    className={classnames(panelStyles.panelText, {
                        [panelStyles.panelTextWarn]:
                            warnBalance && currentAmount > currentBalance,
                    })}
                >{`Balance: ${currentBalance} ${currentCurrency}`}</span>
            </div>
        </div>
    );
};

export default ExchangePanel;
