import ConnectWallet from "../ConnectWallet/component";
import ViewNFT from "../ViewNFT/component";
import { useSelector } from "react-redux";
import { isEmpty } from "ramda";
import {
  getFleekMedia,
  getFleekMetadata,
} from "../../shared/hocs/withEthProvider/reducer";

const HomePage = () => {
  const nftMedia = useSelector((x) => x.userSessionState.fleekMedia);
  const status = useSelector((x) => x.sendTransactionState.status);
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
  );
};

export default HomePage;
