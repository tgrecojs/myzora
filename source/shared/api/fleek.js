import fleekStorage from "@fleekhq/fleek-storage-js";

const postToFleekStorage = async ({
  tokenUri = "default file.jpg",
  sanitizedName = "default NFT name",
  creator = "",
}) => {

  const response = await fleekStorage.upload({
    apiKey: process.env.FLEEK_API_KEY,
    apiSecret: process.env.FLEEK_API_SECRET,
    key: `${sanitizedName}`, //?
    bucket: `tgrecojs-74725-team-bucket/zora-nft-assets/${creator}`,
    data: tokenUri,
  });

  // The function returns the hash of the file, the publicUrl, the key and the bucket.
  const { hash, key, publicUrl } = await response;
  return { hash, key, publicUrl };
};

const postMetadataToFleek = async ({
  imgUrl = "default image URL",
  nftName = "default NFT name",
  price = 0,
  description = "default NFT description string",
  creator = "",
  sanitizedName = "default sanitized name",
}) => {
  console.log("tokenUri::", {
    imgUrl,
    env: process.env,
    apiKey: process.env.FLEEK_API_KEY,
    apiSecret: process.env.FLEEK_API_SECRET,
  });
  const response = await fleekStorage.upload({
    apiKey: process.env.FLEEK_API_KEY,
    apiSecret: process.env.FLEEK_API_SECRET,
    key: `${sanitizedName}/metadata`, //?
    bucket: `tgrecojs-74725-team-bucket/zora-nft-assets/${creator}`,
    data: JSON.stringify({
      imgUrl,
      nftName,
      price,
      description,
      sanitizedName,
      creator,
    }),
  });
  // The function returns the hash of the file, the publicUrl, the key and the bucket.
  const data = await response;
  return data;
};

export { postToFleekStorage, postMetadataToFleek };
