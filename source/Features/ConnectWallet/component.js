import { useDispatch, useSelector } from "react-redux";
import { compose, head } from "ramda";
import CreateNFTForm from "../CreateNewNFT/component";
import { sendTransaction } from "../CreateNewNFT/reducer";

const transactionState = ({ sendTransactionState }) => sendTransactionState;
const transactionStatus = (x) => transactionState(x).status;
const getUserSession = ({ userSessionState }) => userSessionState;
const getUserAddress = (s) => getUserSession(s).walletAddress;

const ConnectWallet = () => {
  const dispatch = useDispatch();
  const onSendTxn = compose(dispatch, sendTransaction);
  // const onAccountChanged = compose(dispatch, setWalletAddress)
  const status = useSelector(transactionStatus);
  const userAddress = useSelector(getUserAddress);
  return (
    <CreateNFTForm
      status={status}
      userAddress={head(userAddress)}
      onSubmit={onSendTxn}
    />
  );
};

export default ConnectWallet;
