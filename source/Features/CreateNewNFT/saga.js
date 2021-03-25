import { call, put, takeLatest } from "redux-saga/effects";
import { sendTransaction, getForm } from "./reducer";
import { requestEthAccount } from "../../shared/api/eth";
//api req for zora
const callFleekApi = (x) => new Promise((res) => res(x)).then((x) => x);

export function* formListenerSaga(action) {
  try {
    const response = yield call(callFleekApi, action.payload);
    console.log("response in listener", response);
    yield put({ type: "SOME_ACTION", payload: response });
  } catch (error) {
    yield console.log("error");
  }
}

function* watchFetchMetamaskAccount() {
  yield takeLatest(sendTransaction().type, formListenerSaga);
}

export default watchFetchMetamaskAccount;
