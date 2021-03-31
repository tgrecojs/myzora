import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchProvider,
  reportError,
  reportSuccess,
  handleError,
  setUserInfo,
  setChainId,
} from "./reducer";
import { initEthProvider, watchChainId } from "../../api/eth";
import { fetchWallet } from "../../../Features/ConnectWallet/reducer";

export function* handleProviderConnection() {
  try {
    console.log("inside formL");
    const response = yield call(initEthProvider);
    console.log("response in listener", { response, web3: window.provider });
    yield put(reportSuccess(response));
    if (response.selectedAddress !== "") yield put(fetchWallet());
  } catch (error) {
    yield put(reportError(error));
    yield put(handleError());
  }
}

function* handleNetworkDetails(action) {
  const { chainId } = action.payload;
  yield put(setChainId(chainId));
}

function* watchFetchMetamaskAccount() {
  yield takeLatest(fetchProvider().type, handleProviderConnection);
  yield takeLatest(reportSuccess().type, handleNetworkDetails);
}

export default watchFetchMetamaskAccount;
