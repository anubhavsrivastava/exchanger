import * as React from "react";
import Button from "../index";
import { render } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";

describe("<Button /> Component", () => {
    it("renders a button with primary class and type", () => {
        const { container } = render(<Button>Hello</Button>);
        let button = container.querySelector("button");
        expect(button).toHaveAttribute("class", "button");
        expect(button).toHaveAttribute("type", "button");
    });

    it("renders a button with children", () => {
        const { container } = render(<Button>Hello</Button>);
        let button = container.querySelector("button");
        expect(button?.innerHTML).toBe("Hello");
    });

    it("renders a button with different type", () => {
        const { container } = render(<Button type="submit">Hello</Button>);
        let button = container.querySelector("button");
        expect(button).toHaveAttribute("type", "submit");
    });

    it("renders a button with disabled state", () => {
        const { container } = render(<Button disabled={true}>Hello</Button>);
        let button = container.querySelector("button");
        expect(button).toBeDisabled();
    });

    it("button calls a onClick callback when clicked", () => {
        const onClick = jest.fn();
        const { container } = render(<Button onClick={onClick}>Hello</Button>);

        let button = container.querySelector("button");
        fireEvent.click(button as HTMLElement);
        expect(onClick).toHaveBeenCalled();
    });
});
