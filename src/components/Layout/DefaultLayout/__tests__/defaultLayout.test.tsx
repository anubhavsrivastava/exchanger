import * as React from "react";
import DefaultLayout from "../index";
import { render } from "@testing-library/react";

describe("<Button /> Component", () => {
    it("renders defaultLayout with minimal layout contents", () => {
        const { container } = render(<DefaultLayout>Hello</DefaultLayout>);
        const app_container = container.querySelector(".default_app_container");
        const header = app_container?.children[0];
        const main = app_container?.children[1];
        const footer = app_container?.children[2];
        expect(header).toHaveAttribute("class", "header");
        expect(main?.tagName).toBe("MAIN");
        expect(main).toHaveAttribute("class", "default_app_layout");
        expect(main?.innerHTML).toBe("Hello");
        expect(footer).toHaveAttribute("class", "footer");
    });

    it("renders defaultLayout with with header and footer contents", () => {
        const { container } = render(
            <DefaultLayout header="headerContent" footer="footerContent">
                Hello
            </DefaultLayout>
        );
        const app_container = container.querySelector(".default_app_container");
        const header = app_container?.children[0];
        const main = app_container?.children[1];
        const footer = app_container?.children[2];
        expect(header).toHaveAttribute("class", "header");
        expect(header?.innerHTML).toBe("headerContent");
        expect(main?.tagName).toBe("MAIN");
        expect(main).toHaveAttribute("class", "default_app_layout");
        expect(main?.innerHTML).toBe("Hello");
        expect(footer).toHaveAttribute("class", "footer");
        expect(footer?.innerHTML).toBe("footerContent");
    });
});
