import { call, put, takeLatest } from "redux-saga/effects";
import { setForm, send, getForm } from "./reducer";
import { requestEthAccount } from "../../shared/api/eth";
//api req for zora
const delay = setTimeout(() => {
  console.log("timing");
}, 1000);
export function* formListenerSaga() {
  try {
    const [response] = yield call(delay);
    console.log("response in listener", response);
    yield put(response);
  } catch (error) {
    yield console.log("error");
  }
}

function* watchFetchMetamaskAccount() {
  yield takeLatest(setForm().type, formListenerSaga);
}

export default watchFetchMetamaskAccount;
