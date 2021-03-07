import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchWallet,
  reportError,
  reportSuccess,
  handleError,
} from "./reducer";
import { requestEthAccount } from "../../shared/api/eth";

export function* fetchAccountSaga() {
  try {
    const [response] = yield call(requestEthAccount);
    yield put(reportSuccess(response));
  } catch (error) {
    yield put(reportError(error));
    yield put(handleError());
  }
}

function* watchFetchMetamaskAccount() {
  yield takeLatest(fetchWallet().type, fetchAccountSaga);
}

export default watchFetchMetamaskAccount;
