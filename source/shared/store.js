import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer as ethProviderReducer } from "./hocs/withEthProvider/reducer";
import { web3Reducer as metamaskWalletReducer } from "./hocs/withEthProvider/reducer";
import { reducer as formReducer } from "../Features/CreateNewNFT/reducer";

import rootSaga from "./sagas";
import createSagaMiddleware from "@redux-saga/core";
const exampleInitialState = {
  web3State: ethProviderReducer(),
  // transactionState: {...metamaskWalletReducer()},
  metamaskAccountState: { ...metamaskWalletReducer() },
  sendTransactionState: formReducer(),
};

export function initializeStore(initialState = exampleInitialState) {
  const sagaMiddleware = createSagaMiddleware();
  const rootReducer = combineReducers({
    web3State: ethProviderReducer,
    metamaskAccountState: metamaskWalletReducer,
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
