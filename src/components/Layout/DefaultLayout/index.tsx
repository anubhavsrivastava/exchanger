import React, { ReactNode, FC } from "react";
import layoutStyles from "./defaultLayout.module.scss";

type Props = {
    children: ReactNode;
    header?: ReactNode;
    footer?: ReactNode;
};
const DefaultLayout: FC<Props> = ({ header, children, footer = "" }) => {
    return (
        <div className={layoutStyles.default_app_container}>
            <div className={layoutStyles.header}>{header}</div>
            <main className={layoutStyles.default_app_layout}>{children}</main>
            <div className={layoutStyles.footer}>{footer}</div>
        </div>
    );
};

export default DefaultLayout;
