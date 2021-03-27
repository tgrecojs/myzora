import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchProvider,
  reportError,
  reportSuccess,
  handleError,
  setUserInfo
} from "./reducer";
import { initEthProvider, requestEthAccount } from "../../api/eth";

export function* formListenerSaga(action) {
  try {
    console.log("inside formL");
    const response = yield call(initEthProvider);
    console.log("response in listener", { response });
    yield put(reportSuccess(response));
    const userData = yield call(requestEthAccount)
    yield put(setUserInfo(userData))
  } catch (error) {
    yield put(reportError(error));
    yield put(handleError());
  }
}

function* watchFetchMetamaskAccount() {
  yield takeLatest(fetchProvider().type, formListenerSaga);
}

export default watchFetchMetamaskAccount;
