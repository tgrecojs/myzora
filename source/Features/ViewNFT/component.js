const ViewNFT = ({nftName, price, description, imgSrc}) => (
  <div>
    <h2>{nftName}</h2>
    <h4>{description}</h4>
    <p>Price: {price} ETH</p>
    <img src={imgSrc} alt={description}/>
  </div>
)
export default ViewNFT
