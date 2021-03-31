import dsm from "redux-dsm";

const SEND_DATA = "sending data";
const MINTING_TOKEN = "minting token";
const MINT_ERROR = "mint token error";
const MINT_SUCCESS = "mint token success";
const SEND_ERROR = "send data error";
const IDLE = "idle";
const SEND_SUCCESS = "send data success";

const sendTxnStates = [
  "initial",
  IDLE,
  [
    "send transaction",
    SEND_DATA,
    ["report error", SEND_ERROR, ["handle error", IDLE]],
    [
      "report success",
      SEND_SUCCESS,
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
    mintToken,
    reportMintSuccess,
    reportMintError,
    handleMintSuccess,
    handleMintError,
  },
  reducer,
} = mintDSM;


export {
  sendTransaction,
  reportError,
  reportMintError,
  reportSuccess,
  handleError,
  handleMintError,
  handleMintSuccess,
  mintToken,
  reportMintSuccess,
  reducer,
};

export default mintDSM;
