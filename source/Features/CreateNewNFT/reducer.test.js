import { describe } from 'riteway'
import {
  constructMediaData,
  sha256FromBuffer,
  generateMetadata,
  isMediaDataVerified
} from '@zoralabs/zdk'

import {
  sendTransaction,
  reportError,
  reportSuccess,
  handleError,
  mintToken,
  reportMintSuccess,
  handleMintSuccess,
  handleMintError,
  reportMintError,
  reducer
} from './reducer'

const SEND_DATA = 'sending data'
const MINTING_TOKEN = 'minting token'
const MINT_ERROR = 'mint token error'
const MINT_SUCCESS = 'mint token success'
const ERROR = 'send data error'
const IDLE = 'idle'
const SUCCESS = 'send data success'

const defaultState = {
  payload: { type: 'empty' },
  status: 'idle'
}

describe('mintTransactionDSM', async (assert) => {
  assert({
    given: 'no arguments',
    should: 'have a status idle',
    actual: reducer().status === 'idle',
    expected: true
  })

  assert({
    given: 'no arguments',
    should: "have a payload of { type: 'empty'}",
    actual: reducer().payload.toString() === { type: 'empty' }.toString(),
    expected: true
  })

  const initialState = reducer(undefined, sendTransaction())

  assert({
    given: 'sendTransaction() action',
    should: 'transition to a status of sending transaction',
    actual: initialState.status === SEND_DATA,
    expected: true
  })

  const testResponse = {
    hash: 'bafybeibqxlz2kiuc5vextqyxxtvfntqv6dwstebvihxt3ztqeyi2su5kty',
    hashV0: 'QmRcscvFkGokfMWWnXcCyWi47Rji15NR2WwGegkYGCzKyo',
    key: '10',
    bucket: 'tgrecojs-74725-team-bucket',
    publicUrl: 'https://storageapi.fleek.co/tgrecojs-74725-team-bucket/10'
  }

  const successSetup = reducer(initialState, reportSuccess(testResponse))

  assert({
    given: 'reportSuccess() action',
    should: `transition state.status to ${SUCCESS}`,
    actual: successSetup.status === 'send data success',
    expected: true
  })

  assert({
    given: 'reportSuccess action',
    should: 'return a new state holding the response data',
    actual: successSetup.payload.toString() === testResponse.toString(),
    expected: true
  })

  assert({
    given: 'reportError action',
    should: 'not be callable while in success state',
    actual: reducer(successSetup, reportError()).status === SUCCESS,
    expected: true
  })

  assert({
    given: 'reportError action',
    should: `transition state.status to ${ERROR}`,
    actual: reducer(initialState, reportError()).status === ERROR,
    expected: true
  })

  assert({
    given: 'mintToken action',
    should: 'not be callable while in success state',
    actual: reducer(initialState, mintToken()).status === SEND_DATA,
    expected: true
  })

  const metadataJSON = generateMetadata('zora-20210101', {
    description: '',
    mimeType: 'text/plain',
    name: '',
    version: 'zora-20210101'
  })

  const contentHash = sha256FromBuffer(Buffer.from('Ours Truly,'))
  const metadataHash = sha256FromBuffer(Buffer.from(metadataJSON))

  const testNftObject = {
    tokenURI: 'https://fleek.co/test-bucket/media-url',
    metadataURI: 'https://fleek.co/test-bucket/media-metadata',
    contentHash,
    metadataHash
  }

  const mintSetup = reducer(successSetup, mintToken(testNftObject))

  assert({
    given: 'mintToken action',
    should: `transition state.status ${MINTING_TOKEN}`,
    actual: mintSetup.status === MINTING_TOKEN,
    expected: true
  })

  assert({
    given: 'mintToken action',
    should: 'return a new state holding its payload',
    actual: mintSetup.payload.toString() === testNftObject.toString(),
    expected: true
  })

  const mintSuccessState = reducer(
    mintSetup,
    reportMintSuccess({ ipfsData: testResponse, zoraData: testNftObject })
  )

  assert({
    given: 'reportMintSuccess action',
    should: `transiton state.status to ${MINT_SUCCESS}`,
    actual: mintSuccessState.status === MINT_SUCCESS,
    expected: true
  })

  assert({
    given: 'handleMintSuccess action',
    should: 'return a new state with a payload of {type: null}',
    actual:
      reducer(mintSuccessState, handleMintSuccess()).payload === undefined,
    expected: true
  })
  assert({
    given: 'handleMintSuccess action',
    should: `transiton state.status to ${IDLE}`,
    actual: reducer(mintSuccessState, handleMintSuccess()).status === IDLE,
    expected: true
  })

  const testMintError = new Error('test response error')
  const mintErrorState = reducer(mintSetup, reportMintError(testMintError))

  assert({
    given: 'reportMintError action',
    should: `transiton state.status to ${MINT_ERROR}`,
    actual: mintErrorState.status === MINT_ERROR,
    expected: true
  })

  assert({
    given: 'reportMintError action',
    should: 'return a new state holding an error object',
    actual: mintErrorState.payload.toString() === testMintError.toString(),
    expected: true
  })
})
