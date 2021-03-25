import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchProvider,
  reportError,
  reportSuccess,
  handleError,
  setUserInfo
} from "./reducer";
import { initEthProvider } from "../../api/eth";

export function* formListenerSaga(action) {
  try {
    console.log("inside formL");
    const response = yield call(initEthProvider);
    console.log("response in listener", { response });
    yield put(reportSuccess(response));
    yield put(setUserInfo(response.userData))
  } catch (error) {
    yield put(reportError(error));
    yield put(handleError());
  }
}

function* watchFetchMetamaskAccount() {
  yield takeLatest(fetchProvider().type, formListenerSaga);
}

export default watchFetchMetamaskAccount;
