import { combineReducers, createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  reducer as ethProviderReducer,
  web3Reducer as userSessionReducer
} from '../Features/MetamaskAuth/reducer'
import { reducer as web3ConnectionReducer } from './hocs/withWeb3/reducer'
import { reducer as formReducer } from '../Features/CreateNewNFT/reducer'

import rootSaga from './sagas'
import createSagaMiddleware from '@redux-saga/core'
const exampleInitialState = {
  metamaskProviderState: ethProviderReducer(),
  userSessionState: userSessionReducer(),
  sendTransactionState: formReducer()
}

export function initializeStore(initialState = exampleInitialState) {
  const sagaMiddleware = createSagaMiddleware()
  const rootReducer = combineReducers({
    metamaskProviderState: ethProviderReducer,
    userSessionState: userSessionReducer,
    sendTransactionState: formReducer,
    web3ConnectionState: web3ConnectionReducer
  })
  return {
    ...createStore(
      rootReducer,
      initialState,
      composeWithDevTools(applyMiddleware(sagaMiddleware))
    ),
    runSaga: sagaMiddleware.run(rootSaga)
  }
}
