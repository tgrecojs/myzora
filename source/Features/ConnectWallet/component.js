import { useDispatch, useSelector } from "react-redux";
import { compose, head } from "ramda";
import CreateNFTForm from "../CreateNewNFT/component";
import { getTxnStatus, sendTransaction } from "../CreateNewNFT/reducer";
import { handleError } from "./reducer";
import {
  getConnectionStatus,
  getChainName,
  getConnectionPayload,
  getWalletAddress,
} from "../../shared/hocs/withEthProvider/reducer";

import {createSelector} from "reselect";
const id =x => x;

const memoizedAddress = createSelector(getWalletAddress, id)
const memoizedTxnStatus = createSelector(getTxnStatus, id)
const memoizedNetworkName= createSelector(getChainName, id)
const compoe = (f) => (g) => f(g);

const ConnectWallet = () => {
  const dispatch = useDispatch();
  const onSendTxn = compose(dispatch, sendTransaction);
  const onReload = compose(dispatch, handleError);

  const networkName = useSelector(memoizedNetworkName);
  const metamaskProviderState = useSelector(getConnectionStatus);
  const userAddress = useSelector(memoizedAddress);
  const txnStatus = useSelector(memoizedTxnStatus);
  console.log({networkName, userAddress})
  return metamaskProviderState === "error" ? (
    <div>
      <p>Please make sure the metamask extension is installed and try again.</p>
      <button onClick={onReload}>Reload Page</button>
    </div>
  ) : // TODO: handle metamask not installed scenario.
  metamaskProviderState === "connected" && !userAddress ?
  <p>Please connect to metamask in order to use the application.</p>

: userAddress && userAddress.length > 0 ?  (
    <>
      <h2>Connected to wallet: {userAddress}</h2>
      <h4>Current Network: {networkName}</h4>
      <CreateNFTForm
        status={txnStatus}
        userAddress={userAddress}
        onSubmit={onSendTxn}
      />
    </>
  ) : (
    <p>Connecting to metamask</p>
  );
};

export default ConnectWallet;
