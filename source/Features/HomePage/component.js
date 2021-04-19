import ConnectWallet from '../MetamaskAuth/component'
import ViewNFT from '../ViewNFT/component'
import { useSelector } from 'react-redux'
import { isEmpty } from 'ramda'
import { isMobile } from '../../shared/utils/mobile'
import { getFleekMedia, getFleekMetadata } from '../MetamaskAuth/reducer'

const HomePage = ({ viewportType }) => {
  const nftMedia = useSelector((x) => x.userSessionState.fleekMedia)
  const status = useSelector((x) => x.sendTransactionState.status)
  console.log({ viewportType })
  return (
    <>
      <ConnectWallet />
      {!isEmpty(nftMedia) && (
        <>
          <h3>Successful mint!</h3>
          <ViewNFT
            nftName={nftMedia.nftName}
            imgSrc={nftMedia.publicUrl}
            description={nftMedia.description}
            price={nftMedia.price}
            status={status}
          />
        </>
      )}
    </>
  )
}

HomePage.getInitialProps = async ({ req }) => {
  const viewportType = isMobile(req)
  console.log({ req, viewportType })
  return { viewportType }
}

export default HomePage
