import { useEffect } from "react";
import { Button } from "../../shared/styled";
import { fetchWallet, walletAddress, walletStatus } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { compose } from "ramda";
import CreateNFTForm from "../CreateNewNFT/component";

const ConnectWallet = () => {
  const status = useSelector(walletStatus);
  const metamaskAddress = useSelector(walletAddress);

  const dispatch = useDispatch();
  const onInitMetamask = compose(dispatch, fetchWallet);

  useEffect(() => {
    onInitMetamask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return status === "error" ? (
    <div>Error</div>
  ) : status !== "signed in" ? (
    <Button onClick={() => onInitMetamask()}>Connect to Metamask</Button>
  ) : (
    <div>
      <h2>Signed in as: {metamaskAddress} </h2>
      <CreateNFTForm address={metamaskAddress} />
    </div>
  );
};

export default ConnectWallet;
