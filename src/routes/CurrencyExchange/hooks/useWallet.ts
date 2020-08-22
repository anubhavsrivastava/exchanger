import { useSelector, shallowEqual } from "react-redux";
import { StoreState } from "../../../store/initialState";

const useWallet = () => {
    const { wallet } = useSelector(
        (state: StoreState) => ({
            wallet: state.walletDetails.wallet,
        }),
        shallowEqual
    );

    const getWalletBalance = (currency: string): number => {
        return wallet[currency] ? wallet[currency].value : 0;
    };

    return {
        wallet,
        getWalletBalance,
    };
};

export default useWallet;
