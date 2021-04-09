import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchProvider,
  reportError,
  reportSuccess,
  handleError,
  disconnectWallet,
  setError,
  setWalletAddress,
  setIsMetamaskInstalled,
  setChainId,
} from "./reducer";
import { initEthProvider, watchChainId } from "../../api/eth";
import { ethRpcActions } from "../../utils/jsonRpcHelpers";
import { fetchWallet } from "../../../Features/ConnectWallet/reducer";
//Created check function to see if the MetaMask extension is installed
const isMetaMaskInstalled = () => {
  const { ethereum } = window;
  return ethereum && ethereum.isMetaMask;
};
typeof window !== "undefined" &&
  Boolean(window.ethereum && window.ethereum.isMetaMask);
const INITIALIZE_WEB3 = "INITIALIZE_WEB3";

export function* handleProviderConnection() {
  try {
    const response = yield call(initEthProvider);
    if (!isMetaMaskInstalled()) {
      yield put(setIsMetamaskInstalled(false));
    } else {
      yield put(setIsMetamaskInstalled(true));
      yield put(reportSuccess(response));
      yield put(setChainId(response.chainId))
      yield put(setWalletAddress([response.selectedAddress]))
    }
    if (!response.selectedAddress) yield put(fetchWallet());
  } catch (error) {
    yield put(reportError(error));
  }
}

function* handleDisconnectSaga() {
  yield put(disconnectWallet())
}

function* handleNetworkChanged(network) {
  yield put(setChainId(network));
}
function* handleAccountChanged(account) {
  yield put(setWalletAddress(account));
}

function* watchFetchMetamaskAccount() {
  yield takeLatest(fetchProvider().type, handleProviderConnection);
  yield takeLatest(reportError().type, handleDisconnectSaga);
  yield takeLatest(ethRpcActions.accountChanged, handleAccountChanged);
  yield takeLatest(ethRpcActions.networkChanged, handleNetworkChanged);
}

export { INITIALIZE_WEB3 };
export default watchFetchMetamaskAccount;
