import React, { ReactNode, FC, MouseEvent } from "react";
import buttonStyles from "./button.module.scss";

type Props = {
    children: ReactNode;
    disabled?: boolean;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    type?: "button" | "submit" | "reset";
    [key: string]: any;
};

const Button: FC<Props> = ({
    children,
    onClick = () => {},
    disabled = false,
    type = "button",
}) => {
    return (
        <button
            className={buttonStyles.button}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
export default Button;
