import dsm from "redux-dsm";

const SIGNED_OUT = "signed out";
const AUTHENTICATING = "authenticating";
const ERROR = "error";
const SIGNED_IN = "signed in";

const fetchMetamaskWallet = [
  "initial",
  SIGNED_OUT,
  [
    "fetch wallet",
    AUTHENTICATING,
    ["report error", ERROR, ["handle error", SIGNED_OUT]],
    ["report success", SIGNED_IN, ["sign out", SIGNED_OUT]],
  ],
  ["report success", SIGNED_IN, ["sign out", SIGNED_OUT]],
];

const metamaskDSM = dsm({
  component: "mintNFTForm",
  description: "fetch user wallet",
  actionStates: fetchMetamaskWallet,
});

const {
  actionCreators: {
    fetchWallet,
    reportError,
    reportSuccess,
    disconnectWallet: disconnectWallet,
    handleError,
  },
  reducer,
} = metamaskDSM;

const walletAddress = ({ metamaskAccountState }) =>
  metamaskAccountState.payload;
const walletStatus = ({ metamaskAccountState }) => metamaskAccountState.status;

export {
  fetchWallet,
  reportError,
  reportSuccess,
  disconnectWallet,
  handleError,
  reducer,
  walletAddress,
  walletStatus,
};

export default metamaskDSM;
