import useWallet from "../hooks/useWallet";
import { renderHook } from "@testing-library/react-hooks";
import { useSelector } from "react-redux";

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
}));

describe("useWallet Hook", () => {
    const initialWallet = {
        EUR: { code: "EUR", value: 1000 },
        GBP: { code: "GBP", value: 500 },
        USD: { code: "USD", value: 800 },
    };
    beforeEach(() => {
        (useSelector as jest.Mock).mockImplementation((callback) => {
            return callback({
                walletDetails: {
                    wallet: initialWallet,
                },
            });
        });
    });
    it("get initial wallet details", () => {
        const { result } = renderHook(useWallet, {});
        let { wallet, getWalletBalance } = result.current;
        expect(wallet).toEqual(initialWallet);
        expect(getWalletBalance("USD")).toEqual(initialWallet["USD"].value);
    });

    it("getWalletBalance for existing wallet", () => {
        const { result } = renderHook(useWallet, {});
        let { getWalletBalance } = result.current;
        expect(getWalletBalance("USD")).toEqual(initialWallet["USD"].value);
    });

    it("getWalletBalance for non-existing wallet should be 0", () => {
        const { result } = renderHook(useWallet, {});
        let { getWalletBalance } = result.current;
        expect(getWalletBalance("INR")).toEqual(0);
    });
});
