import autodux from "autodux";
import dsm from "redux-dsm";

const SUCCESS = "success";
const SENDING_TRANSACTION = "sending transation";
const MINTING_TOKEN = "minting token";
const MINT_ERROR = "mint token error";
const MINT_SUCCESS = "mint token success";
const ERROR = "error";
const IDLE = "idle";

const sendTxnStates = [
  "initial",
  IDLE,
  [
    "send transaction",
    SENDING_TRANSACTION,
    ["report error", ERROR, ["handle error", IDLE]],
    [
      "report success",
      SUCCESS,
      ["handle success", IDLE],
      [
        "mint token",
        MINTING_TOKEN,
        ["report mint error", MINT_ERROR, ["handle mint error", IDLE]],
        ["report mint success", MINT_SUCCESS, ["handle mint success", IDLE]],
      ],
    ],
  ],
];

const mintDSM = dsm({
  component: "CreateNewNFT",
  description: "send NFT txn",
  actionStates: sendTxnStates,
});

const {
  actionCreators: {
    sendTransaction,
    reportError,
    reportSuccess,
    handleError,
    handleSuccess,
    mintToken,
    reportMintSuccess,
    handleMintError,
    reportMintError,
  },
  reducer,
} = mintDSM;

export {
  sendTransaction,
  reportError,
  reportSuccess,
  handleError,
  handleMintError,
  reportMintError,
  handleSuccess,
  mintToken,
  reportMintSuccess,
  reducer,
};

export default mintDSM;
