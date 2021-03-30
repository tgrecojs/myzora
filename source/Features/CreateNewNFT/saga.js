import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  sendTransaction,
  reportSuccess,
  reportError,
  handleError,
  mintToken,
  reportMintSuccess,
  reportMintError,
  handleMintError,
} from "./reducer";
import {
  constructMediaData,
  sha256FromBuffer,
  generateMetadata,
  isMediaDataVerified,
} from "@zoralabs/zdk";
import {
  setFleekResponseData,
  getFleekResponseData,
  getZoraResponseData,
} from "../../shared/hocs/withEthProvider/reducer";
import fleekStorage from "@fleekhq/fleek-storage-js";
//api req for zora
const callZoraApi = (x) => new Promise((res) => res(x)).then((x) => x);

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
    yield put(setFleekResponseData(response));
  } catch (error) {
    yield put(reportError(error));
    yield put(handleError(error));
  }
}

const constructNft = ({
  tokenUri = "default ipfs token uri",
  metadataUri = "default ipfs metdata uri",
  contentHash = "default content hash",
  fileMetadata,
}) => ({
  tokenUri,
  metadataUri,
  contentHash: sha256FromBuffer(Buffer.from(contentHash)),
  metadataHash: sha256FromBuffer(Buffer.from(fileMetadata)),
});

const postToZora = (x) => {
  const response = x;
  return x;
};

function* mintTokenSaga() {
  try {
    const fleekData = yield select((x) => x.userSessionState.fleekResponseData);
    console.log({ fleekData });
    const response = yield call(() => {
      console.log("inside yield call(() => {}) fn::", { fleekData });
      return fleekData;
    });
    yield put(reportMintSuccess(response));
  } catch (error) {
    yield put(reportMintError(error));
    yield put(handleMintError());
  }
}
function* initializeMintSaga(action) {
  yield put(mintToken());
}

export function* mintTokenWatcher() {
  yield takeLatest(reportSuccess().type, initializeMintSaga);
  yield takeLatest(mintToken().type, mintTokenSaga);
}

function* watchFetchMetamaskAccount() {
  yield takeLatest(sendTransaction().type, fleekUploadSaga);
}

export default watchFetchMetamaskAccount;
