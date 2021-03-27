import { call, put, takeLatest } from "redux-saga/effects";
import {
  sendTransaction,
  reportSuccess,
  reportError,
  handleError,
} from "./reducer";
import fleekStorage from "@fleekhq/fleek-storage-js";
//api req for zora
const callFleekApi = (x) => new Promise((res) => res(x)).then((x) => x);

const postToFleekStorage = async ({
  tokenURI = "default file.jpg",
  nftName = "default NFT name",
}) => {
  const response = await fleekStorage.upload({
    apiKey: "+F0Pn/NgMA/bGj8d5gMGYQ==",
    apiSecret: "f1h3qEGQLxAz4Qc8WF7wmThaem/4jabTa5IMZilb0OY=",
    key: nftName,
    data: tokenURI,
  });
  // The function returns the hash of the file, the publicUrl, the key and the bucket.
  const data = await response;
  console.log("response from fleek api ##", { response });
  return data;
};

export function* fleekUploadSaga(action) {
  try {
    console.log({ payload: action.payload });
    const response = yield call(postToFleekStorage, action.payload);
    console.log("response in listener", response);
    yield put(reportSuccess(response));
  } catch (error) {
    yield put(reportError(error));
    yield put(handleError(error));
  }
}

function* watchFetchMetamaskAccount() {
  yield takeLatest(sendTransaction().type, fleekUploadSaga);
}

export default watchFetchMetamaskAccount;
