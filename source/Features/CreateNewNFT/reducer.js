import dsm from 'redux-dsm'

const SEND_DATA = 'sending data'
const MINTING_TOKEN = 'minting token'
const MINT_ERROR = 'mint token error'
const MINT_SUCCESS = 'mint token success'
const SEND_ERROR = 'send data error'
const IDLE = 'idle'
const MINT_READY = 'mint ready'
const SEND_SUCCESS = 'send data success'

const sendTxnStates = [
  'initial',
  MINT_READY,
  [
    'send transaction',
    SEND_DATA,
    ['report error', SEND_ERROR, ['handle error', MINT_READY]],
    [
      'report success',
      SEND_SUCCESS,
      [
        'mint token',
        MINTING_TOKEN,
        ['report mint error', MINT_ERROR, ['handle mint error', MINT_READY]],
        ['report mint success', MINT_READY]
      ]
    ]
  ]
]

const getTxnState = ({ sendTransactionState }) => sendTransactionState
const getTxnStatus = (x) => getTxnState(x).status

const mintDSM = dsm({
  component: 'CreateNewNFT',
  description: 'send NFT txn',
  actionStates: sendTxnStates
})

const {
  actionCreators: {
    sendTransaction,
    reportError,
    reportSuccess,
    handleError,
    mintToken,
    reportMintSuccess,
    reportMintError,
    handleMintError
  },
  reducer
} = mintDSM

export {
  getTxnState,
  getTxnStatus,
  sendTransaction,
  reportError,
  reportMintError,
  reportSuccess,
  handleError,
  handleMintError,
  mintToken,
  reportMintSuccess,
  reducer,
  SEND_DATA,
  SEND_ERROR
}

export default mintDSM
