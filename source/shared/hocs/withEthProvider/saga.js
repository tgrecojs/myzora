import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchProvider,
  reportError,
  reportSuccess,
  handleError,
  setError,
  setIsMetamaskInstalled,
  setChainId,
} from "./reducer";
import { initEthProvider, watchChainId } from "../../api/eth";
import { fetchWallet } from "../../../Features/ConnectWallet/reducer";
//Created check function to see if the MetaMask extension is installed
const isMetaMaskInstalled = () =>
  typeof window !== "undefined" &&
  Boolean(window.ethereum && window.ethereum.isMetaMask);

export function* handleProviderConnection() {
  try {
    console.log("inside formL");
    const response = yield call(initEthProvider);
    console.log("response in listener", { response, web3: window.ethereum });
    if (!(window.ethereum && window.ethereum.isMetaMask)) {
      yield put(setIsMetamaskInstalled(false));
    } else {
      yield put(setIsMetamaskInstalled(true));
      yield put(reportSuccess(response));
    }
    if (response.selectedAddress !== "") yield put(fetchWallet());
  } catch (error) {
    yield put(reportError(error));
  }
}
const reloadPage = () => window.location.reload();

function* handleReloadSaga() {
  yield call(reloadPage);
}


function* handleNetworkDetails(action) {
  const { chainId } = action.payload;
  yield put(setChainId(chainId));
}

function* watchFetchMetamaskAccount() {
  yield takeLatest(fetchProvider().type, handleProviderConnection);
  yield takeLatest(reportSuccess().type, handleNetworkDetails);
  yield takeLatest(handleError().type, handleReloadSaga)
}

export default watchFetchMetamaskAccount;
