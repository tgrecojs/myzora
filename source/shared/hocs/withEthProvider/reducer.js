import autodux from "autodux";
import dsm from "redux-dsm";

const SUCCESS = "success";
const FETCHING = "fetching provider";
const MINTING_TOKEN = "minting token";
const FETCHING_ERROR = "error";
const FETCHING_SUCCESS = "success";
const ERROR = "error";
const IDLE = "idle";

const fetchMetamaskProviderStates = [
  "initial",
  IDLE,
  [
    "fetch provider",
    FETCHING,
    ["report error", ERROR, ["handle error", IDLE]],
    ["report success", SUCCESS],
  ],
];

const mintDSM = dsm({
  component: "metamask provider",
  description: "establish api connection",
  actionStates: fetchMetamaskProviderStates,
});

const {
  actionCreators: { fetchProvider, reportError, reportSuccess, handleError },
  reducer,
} = mintDSM;

const txnPayload = ({ sendTransactionState }) => sendTransactionState.status;

const txnStatus = ({ sendTransactionState }) => sendTransactionState.status;

export {
  fetchProvider,
  reportError,
  reportSuccess,
  handleError,
  reducer,
  txnStatus,
  txnPayload,
};

const ethNetworkLookup = { 1: "mainnet", 3: "ropsten", 4: "rinkeby" };

export const {
  reducer: web3Reducer,
  initial,
  slice,
  actions: {
    setChainId,
    setWalletAddress,
    setEthProvider,
    setError: setEthProviderError,
    setFleekMedia,
    setFleekMetadata,
    setZoraResponseData,
  },
  selectors: {
    getWalletAddress,
    getWeb3,
    getChainId,
    getError: getEthProviderError,
    getFleekMedia,
    getFleekMetadata,
    getZoraResponseData,
  },
} = autodux({
  slice: "userSessionInformation",
  initial: {
    error: null,
    walletAddress: [],
    chainId: null,
    fleekMedia: {},
    fleekMetadata: {},
    zoraResponseData: {},
  },
  actions: {
    setChainId: (state, payload) => ({
      ...state,
      chainId: payload,
      chainName: ethNetworkLookup[parseInt(payload)],
    }),
    setUserInfo: (s,x) => ({ ...s, userInfo: x }),
  },
  selectors: {},
});

export default mintDSM;
