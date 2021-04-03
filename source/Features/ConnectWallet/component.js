import { useDispatch, useSelector } from "react-redux";
import { compose, head } from "ramda";
import CreateNFTForm from "../CreateNewNFT/component";
import { sendTransaction } from "../CreateNewNFT/reducer";
import { handleError } from "./reducer";

const transactionState = ({ sendTransactionState }) => sendTransactionState;
const transactionStatus = (x) => transactionState(x).status;
const getWeb3State = ({ web3State }) => web3State;
const getWeb3Status = (s) => getWeb3State(s).status;
const getUserSession = ({ userSessionState }) => userSessionState;
const getMetamaskState = ({ metamaskState }) => metamaskState;
const getUserAddress = (s) => getUserSession(s).walletAddress;

const ConnectWallet = () => {
  const dispatch = useDispatch();
  const onSendTxn = compose(dispatch, sendTransaction);
  const onReload = compose(dispatch, handleError);
  // const onAccountChanged = compose(dispatch, setWalletAddress)
  const metamaskState = useSelector(getMetamaskState).status;
  const connectionError = useSelector((x) => getUserSession(x).error);
  const status = useSelector(transactionStatus);
  const web3State = useSelector(getWeb3Status);
  const userAddress = useSelector(getUserAddress);
  return web3State === "error" ? (
    <div>
      <p>Please make sure the metamask extension is installed and try again.</p>
      <button onClick={onReload}>Reload Page</button>
    </div>
  ) : connectionError !== null ? (
    <div>
      <p>{connectionError}</p>
      <button onClick={onReload}>Reload Page</button>
    </div>
  ) : metamaskState === "signed in" ? (
    <CreateNFTForm
      status={status}
      userAddress={head(userAddress)}
      onSubmit={onSendTxn}
    />
  ) : (
    <p>Connecting to metamask</p>
  );
};

export default ConnectWallet;
