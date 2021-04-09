import { all, apply, call, put, take as takeAction } from "redux-saga/effects";
import detectEthereumProvider from "@metamask/detect-provider";
import { INITIALIZE_WEB3 } from "../hocs/withEthProvider/saga";
import { setChainId, setWalletAddress } from "../hocs/withEthProvider/reducer";

import { fetchProvider } from "../hocs/withEthProvider/reducer";
import { channel } from "@redux-saga/core";

const ethRpcMessages = {
  accountChanged: "accountsChanged",
  networkChanged: "chainChanged",
  disconnect: "disconnect",
  connect: "connect",
};

const ethRpcActions = {
  accountChanged: "ACCOUNT_CHANGED",
  networkChanged: "CHAIN_CHANGED",
  networkDisconnected: "ETHEREUM_DISCONNECTED",
};

const { accountChanged, networkChanged, disconnect, connect } = ethRpcMessages;

const createChannel = () => {
  const messageQueue = [];
  const resolveQueue = [];

  const put = (msg) => {
    // anyone waiting for a message ?
    if (resolveQueue.length) {
      // deliver the message to the oldest one waiting (First In First Out)
      const nextResolve = resolveQueue.shift();
      nextResolve(msg);
    } else {
      // no one is waiting ? queue the event
      messageQueue.push(msg);
    }
  };

  // returns a Promise resolved with the next message
  const take = () => {
    // do we have queued messages ?
    if (messageQueue.length) {
      // deliver the oldest queued message
      return Promise.resolve(messageQueue.shift());
    } else {
      // no queued messages ? queue the taker until a message arrives
      return new Promise((resolve) => resolveQueue.push(resolve));
    }
  };

  return {
    take,
    put,
  };
};

const createEthereumDisconnectionChannel = () => {
  const channel = createChannel();
  const eth = window.ethereum;
  eth.on(disconnect, channel.put);
  return channel;
};

const createEthereumConnectionChannel = (provider) => {
  const channel = createChannel();
  const eth = window.ethereum;
  eth.on("connect", channel.put);
  return channel;
};
const createCurrentChainChannel = () => {
  const channel = createChannel();
  const eth = window.ethereum;

  // every change event will call put on the channel
  eth.on(networkChanged, channel.put);
  return channel;
};

const createCurrentAccountChannel = () => {
  const channel = createChannel();
  const eth = window.ethereum;

  // every change event will call put on the channel
  eth.on(accountChanged, channel.put);
  return channel;
};
const getProvider = async () => {
  const provider = await detectEthereumProvider();
  if (provider) {
    return provider;
  }
};

function* monitorEthDisonnection(channel) {
  console.log("insidem monitorEthDisonnection##", { channel });
  while (true) {
    const info = yield call(channel.take); // Blocks until the promise resolves
    console.log("ETHEREUM_DISCONNECTED##", { payload: info, channel });
    yield put({ type: ethRpcActions.networkDisconnected, payload: info });
  }
}

function* monitorEthConnection(channel) {
  console.log("insidem monitorEthConnection##", { channel });
  while (true) {
    console.log("ETHEREUM_CONNECTED##", { channel });
    yield put({ type: "ETHEREUM_CONNECTED" });
  }
}

function* startEthereumConnection() {
  // Wait for the configuration to be set. This can happen multiple
  // times during the life cycle, for example when the user wants to
  // switch database/workspace.
  while (yield takeAction(fetchProvider().type)) {
    // let state = getState();
    // let wrapper = state.database.wrapper;

    // // Wait for a connection to work.
    // yield apply(wrapper, wrapper.connect);

    // Trigger replication, and keep the promise.
    const provider = getProvider();

    console.log({ provider });
    if (provider) {
      yield all([
        call(
          monitorEthDisonnection,
          createEthereumDisconnectionChannel(provider)
        ),
        call(monitorCurrentChain, createCurrentChainChannel(provider)),
        call(monitorCurrentAccount, createCurrentAccountChannel(provider)),
      ]);
    }
  }
}

function* monitorCurrentAccount(channel) {
  console.log("insidem monitorCurrentAccount##", { channel });
  while (true) {
    const address = yield call(channel.take); // Blocks until the promise resolves
    console.log("ACCOUNT_CHANGED##", { payload: address, channel });
    yield put(setWalletAddress(address));
  }
}

function* monitorCurrentChain(channel) {
  console.log("insidem monitorCurrentChain##", { channel });
  while (true) {
    const currentChain = yield call(channel.take); // Blocks until the promise resolves
    console.log("CHAIN_CHANGED##", { payload: currentChain, channel });
    yield put(setChainId(currentChain));
  }
}

export { createChannel, ethRpcActions, startEthereumConnection };

export default startEthereumConnection;
