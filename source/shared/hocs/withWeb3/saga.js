import {
  establishConnectionSuccess,
  establishConnectionFailed,
  establishConnection
} from './reducer'
import {
  connectToMetamask,
  setWalletAddress,
  setChainId,
  setIsMetamaskInstalled
} from '../../../Features/MetamaskAuth/reducer'
import { handleMetamaskConnection } from '../../../Features/MetamaskAuth/saga'
import { isMetaMaskInstalled } from '../../utils/jsonRpcHelpers'
import { put, takeLatest } from 'redux-saga/effects'
import { call } from 'crocks/core/_unit'

export function* handleWeb3Connection() {
  const { ethereum } = window
  console.log('insidhe handleweb3connection')
  yield put(
    establishConnectionSuccess({
      chainId: ethereum.chainId,
      selectedAddress: ethereum.selectedAddress
    })
  )
  if (!isMetaMaskInstalled()) {
    yield put(setIsMetamaskInstalled(false))
  } else {
    yield put(setIsMetamaskInstalled(true))
  }
}

function* handleConnectedUser(action) {
  const { payload } = action
  if (payload.selectedAddress) yield put(connectToMetamask())
  const { ethereum } = window
  yield setChainId(ethereum.chainId)
}

function* web3ConnectionWatcher() {
  yield takeLatest(establishConnection().type, handleWeb3Connection)
  yield takeLatest(connectToMetamask().type, handleMetamaskConnection)
  yield takeLatest(establishConnectionSuccess().type, handleConnectedUser)
}

export default web3ConnectionWatcher
