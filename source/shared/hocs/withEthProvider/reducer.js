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

export const {
  reducer: web3Reducer,
  initial,
  slice,
  actions: { setUserInfo, setEthProvider, setError: setEthProviderError },
  selectors: { getWeb3, getError: getEthProviderError },
} = autodux({
  slice: "web3API",
  initial: {
    payload: null,
    error: null,
    userInfo: null
  },
  actions: {
    setUserInfo: (x) => ({payload: x})
  },
  selectors: {},
});

export default mintDSM;
