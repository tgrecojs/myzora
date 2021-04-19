import {
  connectToMetamask,
  getConnectionStatus,
  getWalletAddress,
  getIsMetamaskInstalled
} from './reducer'
import { useDispatch, useSelector } from 'react-redux'
import { compose } from 'ramda'
import CreateNFTForm from '../CreateNewNFT/component'
import { getTxnStatus, sendTransaction } from '../CreateNewNFT/reducer'
const Web3Authentication = () => {
  const dispatch = useDispatch()
  const onConnectToMetamask = compose(dispatch, connectToMetamask)
  const isMetamaskInstalled = useSelector(getIsMetamaskInstalled)
  const walletAddress = useSelector(getWalletAddress)
  const txnStatus = useSelector(getTxnStatus)
  const onSendTxn = compose(dispatch, sendTransaction)
  return !isMetamaskInstalled ? (
    <div>
      <p>Please make sure the metamask extension is installed and try again.</p>
      <button onClick={() => window.location.reload()}>Reload Page</button>
    </div>
  ) : walletAddress.length === 0 ? (
    <div>
      <button onClick={onConnectToMetamask}>Sign In withMetamask</button>
    </div>
  ) : (
    <>
      <h2>Connected to wallet: {walletAddress}</h2>
      <CreateNFTForm
        status={txnStatus}
        userAddress={walletAddress}
        onSubmit={onSendTxn}
      />
    </>
  )
}

export default Web3Authentication
