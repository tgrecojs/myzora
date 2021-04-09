import { useSelector } from "react-redux";
import {
  getTxnState,
  getTxnStatus,
  SEND_DATA,
  SEND_ERROR,
} from "../CreateNewNFT/reducer";
const MintToken = ({ children }) => {
  const txnStatus = useSelector(getTxnStatus);
  const txnError = useSelector(getTxnState);
  return status === SEND_DATA ? (
    <p>Transaction is currently being minted...</p>
  ) : status === SEND_ERROR ? (
    <p>Error minting transaction:: {txnError.payload.code}</p>
  ) : txnStatus === "idle" ? (
    { children }
  ) : null;
};

export default MintToken;
