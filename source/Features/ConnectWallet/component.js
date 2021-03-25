import { useEffect } from "react";
import { Button } from "../../shared/styled";
import { fetchWallet, walletAddress, walletStatus } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { compose } from "ramda";
import CreateNFTForm from "../CreateNewNFT/component";
import { sendTransaction, txnStatus } from "../CreateNewNFT/reducer";

const ConnectWallet = () => {
  const dispatch = useDispatch();
  const web3State = useSelector(({ web3State }) => web3State);
  console.log({ web3State });
  const onSendTxn = compose(dispatch, sendTransaction);

  return (
    <>
      <CreateNFTForm
        onSubmit={(x) => {
          console.log({ x });
          onSendTxn(x);
        }}
      />
    </>
  );
};

export default ConnectWallet;
