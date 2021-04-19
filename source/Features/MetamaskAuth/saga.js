import { call, put, takeLatest } from 'redux-saga/effects'
import {
  connectToMetamask,
  reportError,
  reportSuccess,
  handleError,
  disconnectWallet,
  setError,
  setWalletAddress,
  setIsMetamaskInstalled,
  setChainId
} from './reducer'
import isEmpty from 'crocks/predicates/isEmpty'
import {
  establishConnection,
  establishConnectionSuccess
} from '../../shared/hocs/withWeb3/reducer'

import { requestEthAccount } from '../../shared/api/eth'
import { ethRpcActions } from '../../shared/utils/jsonRpcHelpers'

export function* handleMetamaskConnection() {
  try {
    const user = yield call(requestEthAccount)
    yield put(reportSuccess(user))
  } catch (error) {
    yield put(reportError(error))
  }
}

function* handleConnectionDetails(action) {
  yield put(setWalletAddress(action.payload))
  yield put(setChainId(window.ethereum.chainId))
  // TODO: implement automatic refresh
  // ex. yield call()
}

function* handleNetworkChanged(action) {
  const { payload } = action
  const { chainId, selectedAddress } = payload
  yield put(setChainId(chainId))
  yield put(setWalletAddress(selectedAddress))
  // TODO: implement automatic refresh
  // ex. yield call()
}

function* handleAccountChanged(action) {
  const { payload } = action
  if (!isEmpty(payload)) {
    yield put(setWalletAddress(payload))
  } else {
    yield put(setWalletAddress([]))
    yield put(disconnectWallet())
  }
}

function* watchFetchMetamaskAccount() {
  yield takeLatest(reportSuccess().type, handleConnectionDetails)
  yield takeLatest(ethRpcActions.networkChanged, handleNetworkChanged)
}

export default watchFetchMetamaskAccount
