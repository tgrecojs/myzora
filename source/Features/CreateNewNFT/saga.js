import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
  sendTransaction,
  reportSuccess,
  reportError,
  handleError,
  mintToken,
  reportMintSuccess,
  reportMintError,
  handleMintError
} from './reducer'
import {
  constructMediaData,
  sha256FromBuffer,
  sha256FromFile,
  generateMetadata
} from '@zoralabs/zdk'
import {
  setFleekMedia,
  setFleekMetadata,
  getFleekMedia,
  getZoraResponseData
} from '../MetamaskAuth/reducer'
import { postMetadataToFleek, postToFleekStorage } from '../../shared/api/fleek'
import { sanitizeString } from '../../shared/utils'

const createZoraReqObject = async ({ tokenUri, nftName, imgSrc, price }) => {
  const contentHash = await sha256FromFile(Buffer.from(tokenUri))
  console.log({ contentHash })
  const metadataHash = await sha256FromBuffer(
    Buffer.from(JSON.stringify({ price, nftName, imgSrc }))
  )
  return { contentHash, metadataHash }
}

const createMetadata = ({
  name = 'default NFT name',
  description = 'default NFT description',
  mimeType = 'image/default'
}) => ({
  version: `${name}-${new Date().toUTCString()}`,
  name,
  description,
  mimeType
})

const sampleVersion = 'zora-20210101'

const hashString = (str) => sha256FromBuffer(''.concat(Buffer.from(str)))

export function* fleekUploadSaga(action) {
  try {
    const {
      tokenUri,
      price,
      description,
      creator,
      nftName,
      mimeType
    } = action.payload
    console.log({ mimeType })
    const sanitizedName = sanitizeString(nftName)

    const fleekMedia = yield call(postToFleekStorage, {
      tokenUri,
      sanitizedName,
      creator
    })

    const fleekMetadata = yield call(postMetadataToFleek, {
      imgUrl: fleekMedia.publicUrl,
      nftName,
      sanitizedName,
      price,
      description,
      creator
    })

    // need to validate this data firt
    const metadataJSON = yield generateMetadata(sampleVersion, {
      name: nftName,
      mimeType,
      description,
      version: sampleVersion
    })

    const metadataHash = hashString(metadataJSON)
    console.log({ metadataJSON, metadataHash })

    yield put(
      reportSuccess({
        fleekMedia: {
          ...fleekMedia,
          nftName: sanitizedName,
          price,
          description
        },
        fleekMetadata
      })
    )
  } catch (error) {
    yield put(reportError(error))
    yield put(handleError(error))
  }
}

const constructNft = ({
  tokenUri = 'default ipfs token uri',
  metadataUri = 'default ipfs metdata uri',
  contentHash = 'default content hash',
  fileMetadata
}) => ({
  tokenUri,
  metadataUri,
  contentHash: sha256FromBuffer(Buffer.from(contentHash)),
  metadataHash: sha256FromBuffer(Buffer.from(fileMetadata))
})

const postToZora = ({ tokenUri, metadataUri }) => {
  console.log({ tokenUri, metadataUri })
  return { status: 'success!', tokenUri, metadataUri }
}

function* initializeMintSaga(action) {
  yield put(setFleekMedia(action.payload.fleekMedia))
  yield put(setFleekMetadata(action.payload.fleekMetadata))
  yield put(mintToken())
}

function* mintTokenSaga() {
  try {
    const tokenUri = yield select(
      (x) => x.userSessionState.fleekMedia.publicUrl
    )
    const metadataUri = `${tokenUri}/metadata`
    console.log({ tokenUri, metadataUri })
    const response = yield call(postToZora, { tokenUri, metadataUri })
    yield put(reportMintSuccess(response))
  } catch (error) {
    yield put(reportMintError(error))
    yield put(handleMintError())
  }
}

export function* mintTokenWatcher() {
  yield takeLatest(reportSuccess().type, initializeMintSaga)
  yield takeLatest(mintToken().type, mintTokenSaga)
}

function* watchFetchMetamaskAccount() {
  yield takeLatest(sendTransaction().type, fleekUploadSaga)
}

export default watchFetchMetamaskAccount
