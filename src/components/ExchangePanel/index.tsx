import React, { FC } from "react";
import Dropdown from "react-dropdown";
import panelStyles from "./panel.module.scss";

type Props = {
    color?: "white" | "grey";
    currencies?: any[]; //todo

    // onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    // type?: "button" | "submit" | "reset";
    [key: string]: any;
};

const ExchangePanel: FC<Props> = ({ color = "white" }) => {
    const options = [
        { value: "eur", label: "EUR" },
        { value: "usd", label: "USD" },
        { value: "sgd", label: "SGD" },
    ];
    const defaultOption = options[0];
    return (
        <div
            className={`${panelStyles.panel} ${panelStyles[`${color}-panel`]}`}
        >
            <div className={panelStyles.panelRow}>
                <Dropdown
                    className=""
                    options={options}
                    value={defaultOption}
                    placeholder="Select an option"
                />
                <input type="text" placeholder="0" className="input-huge" />
            </div>
            <div className={`text-grey text ${panelStyles.panelRow}`}>
                Balance: 600 Eur
            </div>
        </div>
    );
};

export default ExchangePanel;
