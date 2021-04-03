import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  reducer as ethProviderReducer,
  web3Reducer as userSessionReducer,
} from "./hocs/withEthProvider/reducer";
import {reducer as connectWalletReducer } from "../Features/ConnectWallet/reducer"
import { reducer as formReducer } from "../Features/CreateNewNFT/reducer";

import rootSaga from "./sagas";
import createSagaMiddleware from "@redux-saga/core";
const exampleInitialState = {
  web3State: ethProviderReducer(),
  userSessionState: userSessionReducer(),
  sendTransactionState: formReducer(),
  metamaskState: connectWalletReducer(),
};

export function initializeStore(initialState = exampleInitialState) {
  const sagaMiddleware = createSagaMiddleware();
  const rootReducer = combineReducers({
    web3State: ethProviderReducer,
    metamaskState: connectWalletReducer,
    userSessionState: userSessionReducer,
    sendTransactionState: formReducer,
  });
  return {
    ...createStore(
      rootReducer,
      initialState,
      composeWithDevTools(applyMiddleware(sagaMiddleware))
    ),
    runSaga: sagaMiddleware.run(rootSaga),
  };
}
