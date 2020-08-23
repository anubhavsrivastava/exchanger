import React, { FC, memo } from "react";
import indicatorStyles from "./indicator.module.scss";
import { Currency } from "../../models/currency";
import trendIcon from "../../static/images/spike.svg";

type Props = {
    rootClass?: string;
    source?: Currency;
    target?: Currency;
    exchangeRate?: number;
};

const RateIndicator: FC<Props> = memo(
    ({ rootClass, source, target, exchangeRate }) => (
        <div className={rootClass}>
            <img src={trendIcon} alt="rate" />
            <span className={indicatorStyles.rateContent}>
                {exchangeRate === 0
                    ? "Fetching Rate..."
                    : `1 ${source?.code} = ${exchangeRate?.toFixed(2)} ${
                          target?.code
                      }`}
            </span>
        </div>
    )
);

export default RateIndicator;
