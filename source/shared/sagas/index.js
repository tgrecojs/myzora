import { fork, all } from "redux-saga/effects";
import fetchMetamaskAccountWatcher from "../../Features/ConnectWallet/saga";
import connectMetamaskWatcher from "../hocs/withEthProvider/saga";

import sendTransactionWatcher,  { mintTokenWatcher}  from "../../Features/CreateNewNFT/saga";

export default function* root() {
  yield fork(connectMetamaskWatcher);
  yield all([
    sendTransactionWatcher(),
    //listens for user to kick off mint transaction */
    fetchMetamaskAccountWatcher(),
    mintTokenWatcher()
  ]);
}
