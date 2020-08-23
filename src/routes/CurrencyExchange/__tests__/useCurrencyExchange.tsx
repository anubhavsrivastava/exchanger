import useCurrencyExchange from "../hooks/useCurrencyExchange";
import { renderHook, act } from "@testing-library/react-hooks";
import { useSelector } from "react-redux";

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

describe("useCurrencyExchange Hook", () => {
    const initialRates = { USD: 2, GBP: 3, EUR: 1 };
    const initialProps = {
        currencies: ["EUR", "USD"],
        defaultCurrency: "EUR",
    };

    beforeEach(() => {
        (useSelector as jest.Mock).mockImplementation((callback) => {
            return callback({
                exchangeRate: {
                    rates: initialRates,
                },
            });
        });
    });

    it("get initial exchange rates details with source and target", () => {
        const { result } = renderHook(useCurrencyExchange, {
            initialProps,
        });
        let { rates, source, target } = result.current;
        expect(rates).toEqual(initialRates);
        expect(source).toEqual({
            code: initialProps.defaultCurrency,
            value: 0,
        });

        expect(target).toEqual({
            code: initialProps.currencies[1],
            value: 0,
        });
    });

    it("should switch currencies on onSwitch event", () => {
        const { result } = renderHook(useCurrencyExchange, {
            initialProps,
        });
        let { onSwitch, source, target } = result.current;

        const prevSource = { ...source };
        const prevTarget = { ...target };
        act(() => onSwitch());
        expect(result.current.source).toEqual(prevTarget);
        expect(result.current.target).toEqual(prevSource);
    });

    it("should update source amount and change target amount as per exchange rate", async () => {
        const { result } = renderHook(useCurrencyExchange, {
            initialProps,
        });
        let { updateSourceAmount, source, target } = result.current;

        act(() => updateSourceAmount(10));
        expect(result.current.source).toEqual({ ...source, value: 10 });
        expect(result.current.target).toEqual({ ...target, value: 20 });
    });

    it("should update target amount and change source amount as per exchange rate", async () => {
        const { result } = renderHook(useCurrencyExchange, {
            initialProps,
        });
        let { updateTargetAmount, source, target } = result.current;

        act(() => updateTargetAmount(20));
        expect(result.current.source).toEqual({ ...source, value: 10 });
        expect(result.current.target).toEqual({ ...target, value: 20 });
    });

    it("should update source currency", async () => {
        const { result } = renderHook(useCurrencyExchange, {
            initialProps,
        });
        let { updateSourceCurrency, source } = result.current;

        act(() => updateSourceCurrency("USD"));
        expect(result.current.source).toEqual({ ...source, code: "USD" });
    });

    it("should update target currency", async () => {
        const { result } = renderHook(useCurrencyExchange, {
            initialProps,
        });
        let { updateTargetCurrency, target } = result.current;

        act(() => updateTargetCurrency("USD"));
        expect(result.current.target).toEqual({ ...target, code: "USD" });
    });

    it("should return exchange amount with currentRates", async () => {
        const { result } = renderHook(useCurrencyExchange, {
            initialProps,
        });
        let { getExchangeAmount, source, target } = result.current;

        const exchangeAmount = getExchangeAmount(source, target, 10);
        expect(exchangeAmount).toEqual(5);
    });

    it("should return false if exchange is not allowed", async () => {
        const { result } = renderHook(useCurrencyExchange, {
            initialProps,
        });
        let { canExchangeCurrency } = result.current;

        const canExchange = canExchangeCurrency();
        expect(canExchange).toEqual(false);
    });

    it("should return true if exchange is possible", async () => {
        const { result } = renderHook(useCurrencyExchange, {
            initialProps,
        });
        let { updateSourceAmount } = result.current;
        act(() => updateSourceAmount(10));

        let canExchange = result.current.canExchangeCurrency();
        expect(canExchange).toEqual(true);
    });

    it("should return false if source and target code are equal", async () => {
        const { result } = renderHook(useCurrencyExchange, {
            initialProps,
        });
        let {
            updateSourceAmount,
            updateSourceCurrency,
            target,
        } = result.current;
        act(() => updateSourceAmount(10));

        let canExchange = result.current.canExchangeCurrency();
        expect(canExchange).toEqual(true);
        act(() => updateSourceCurrency(target.code));
        canExchange = result.current.canExchangeCurrency();
        expect(canExchange).toEqual(false);
    });
});
