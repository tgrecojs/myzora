import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchWallet,
  reportError,
  reportSuccess,
  handleError,
} from "./reducer";
import {
  setWalletAddress,
  setError,
} from "../../shared/hocs/withEthProvider/reducer";
import { requestEthAccount } from "../../shared/api/eth";

export function* fetchAccountSaga() {
  try {
    const response = yield call(requestEthAccount);
    yield put(reportSuccess(response));
  } catch (error) {
    yield put(reportError(error));
    if (error.code === 4001)
      yield put(
        setError(
          "Wallet connection request rejected. Please connect to metamask and reload the page."
        )
      );
  }
}

function* fetchSuccessSaga(action) {
  yield put(setWalletAddress(action.payload));
}
const reloadPage = () => window.location.reload();

function* handleReloadSaga() {
  yield call(reloadPage);
}

function* watchFetchMetamaskAccount() {
  yield takeLatest(fetchWallet().type, fetchAccountSaga);
  yield takeLatest(reportSuccess().type, fetchSuccessSaga);
  yield takeLatest(handleError().type, handleReloadSaga);
}

export default watchFetchMetamaskAccount;
