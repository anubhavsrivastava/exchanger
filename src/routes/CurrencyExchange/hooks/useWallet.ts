import { useSelector, shallowEqual } from "react-redux";
import { StoreState } from "../../../store/initialState";

const useWallet = () => {
    const { wallet } = useSelector(
        (state: StoreState) => ({
            wallet: state.walletDetails.wallet,
        }),
        shallowEqual
    );

    return {
        wallet,
    };
};

export default useWallet;
