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
  sha256FromFile,
  generateMetadata,
  isMediaDataVerified,
} from "@zoralabs/zdk";
import {
  setFleekMedia,
  setFleekMetadata,
  getFleekMedia,
  getZoraResponseData,
} from "../../shared/hocs/withEthProvider/reducer";
import {
  postMetadataToFleek,
  postToFleekStorage,
} from "../../shared/api/fleek";
import { sanitizeString } from "../../shared/utils";

const createZoraReqObject = async ({ tokenUri, nftName, imgSrc, price }) => {
  const contentHash = await sha256FromFile(Buffer.from(tokenUri));
  console.log({ contentHash });
  const metadataHash = await sha256FromBuffer(
    Buffer.from(JSON.stringify({ price, nftName, imgSrc }))
  );
  return { contentHash, metadataHash };
};

export function* fleekUploadSaga(action) {
  try {
    const { tokenUri, price, description, creator, nftName } = action.payload;
    const sanitizedName = sanitizeString(nftName);
    const fleekMedia = yield call(postToFleekStorage, {
      tokenUri,
      sanitizedName,
      creator,
    });

    const fleekMetadata = yield call(postMetadataToFleek, {
      imgUrl: fleekMedia.publicUrl,
      nftName,
      sanitizedName,
      price,
      description,
      creator,
    });

    yield put(
      reportSuccess({
        fleekMedia: {
          ...fleekMedia,
          nftName: sanitizedName,
          price,
          description,
        },
        fleekMetadata,
      })
    );
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

const postToZora = ({ tokenUri, metadataUri }) => {
  console.log({ tokenUri, metadataUri });
  return { status: "success!", tokenUri, metadataUri };
};

function* mintTokenSaga() {
  try {
    const tokenUri = yield select(
      (x) => x.userSessionState.fleekMedia.publicUrl
    );
    const metadataUri = `${tokenUri}/metadata`;
    console.log({ tokenUri, metadataUri });
    const response = yield call(postToZora, { tokenUri, metadataUri });
    yield put(reportMintSuccess(response));
  } catch (error) {
    yield put(reportMintError(error));
    yield put(handleMintError());
  }
}
function* initializeMintSaga(action) {
  console.log("inside initializeMint:::", { action });
  yield put(setFleekMedia(action.payload.fleekMedia));
  yield put(setFleekMetadata(action.payload.fleekMetadata));
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
