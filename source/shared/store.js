import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer as ethProviderReducer } from "./hocs/withEthProvider/reducer";
import { reducer as metamaskWalletReducer } from "../Features/ConnectWallet/reducer";

import rootSaga from "./sagas";
import createSagaMiddleware from "@redux-saga/core";
const exampleInitialState = {
  web3State: ethProviderReducer(),
  // transactionState: {...metamaskWalletReducer()},
  metamaskAccountState: { ...metamaskWalletReducer() },
};

export function initializeStore(initialState = exampleInitialState) {
  const sagaMiddleware = createSagaMiddleware();
  const rootReducer = combineReducers({
    web3State: ethProviderReducer,
    metamaskAccountState: metamaskWalletReducer,
    // transactionState: metamaskWalletReducer
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
