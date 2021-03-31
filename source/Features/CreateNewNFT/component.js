import React, { useState, useRef } from "react";
import { string, func, number, bool } from "prop-types";
import { FormWrapper } from "../../shared/styled";

const CreateNewNFT = ({
  name = "",
  price = 0,
  mediaName = "",
  onSubmit,
  descriptionText = "",
  status = "idle",
  userAddress = "",
}) => {
  const fileRef = useRef(null);

  const [nftName, setNftName] = useState(name);
  const [askingPrice, setAskingPrice] = useState(price);
  const [description, setDescription] = useState(descriptionText);
  const [fileName, setFileName] = useState(mediaName);

  const setter = (set) => (e) => {
    const { target } = e;
    const { value } = target;
    set(value);
  };

  const resetRef = (ref) => (ref.current.value = null);

  const setFiles = (set) => (e) => {
    const { target } = e;
    const { files } = target;
    set(files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      nftName,
      description,
      price: askingPrice,
      tokenUri: fileName,
      creator: userAddress,
    });
    setNftName("");
    setAskingPrice(0);
    setDescription("");
    resetRef(fileRef);
  };
  return status === "minting token" || status === "sending data" ? (
    <p>minting...</p>
  ) : (
    <FormWrapper as="form" onSubmit={handleSubmit} py={3}>
      <label htmlFor="name">NFT Name</label>
      <input
        value={nftName}
        id="name"
        name="name"
        type="text"
        onChange={setter(setNftName)}
      />
      <label htmlFor="description">Description</label>
      <input
        value={description}
        id="description"
        name="description"
        type="text"
        onChange={setter(setDescription)}
      />
      <label htmlFor="askingPrice">Asking Price</label>
      <input
        value={askingPrice}
        id="askingPrice"
        name="askingPrice"
        type="number"
        onChange={setter(setAskingPrice)}
      />
      <label htmlFor="nftMedia" name="nftMedia">
        Token URI (media)
      </label>

      <input
        id="nftMedia"
        name="nftMedia"
        type="file"
        ref={fileRef}
        onChange={setFiles(setFileName)}
      />
      <button bg="blue" type="submit">
        Send Transaction
      </button>
    </FormWrapper>
  );
};

CreateNewNFT.propTypes = {
  name: string,
  price: number,
  mediaName: string,
  onSubmit: func,
  descriptionText: string,
  isMinting: bool,
};
export default CreateNewNFT;
