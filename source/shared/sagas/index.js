import { fork, all } from "redux-saga/effects";
import fetchMetamaskAccountWatcher from "../../Features/ConnectWallet/saga";
// import sendTransactionGenerator from "../../SendCrypto/saga";

export default function* root() {
  yield fork(fetchMetamaskAccountWatcher);
  yield all([
    /** sendTransactionWatcher() - listens for user to kick off mint transaction */
  ]);
}
