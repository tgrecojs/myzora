import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { compose } from "ramda";
import { FormWrapper } from "../../shared/styled";

const noop = () => {};

const CreateNewNFT = ({
  defaultName = "Default NFT Name",
  defaultPrice = 0,
  defaultTokenUri = "",
  onSubmit,
  status,
}) => {
  const dispatch = useDispatch();
  // console.log("dispatch", dispatch);
  // const initForm = compose(dispatch, setForm);

  const [nftName, setNftName] = useState("");
  const [price, setPrice] = useState(0);
  const [tokenURI, setTokenURI] = useState("");


  const setter = (set) => (e) => {
    const { target } = e;
    const { value } = target;
    console.log({ value });
    set(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nftName, price, tokenURI });
    setNftName("");
    setPrice("");
    setTokenURI("");
  };
  return (
    <FormWrapper as="form" onSubmit={handleSubmit} py={3}>
      <label htmlFor="name">NFT Name</label>
      <input
        value={nftName}
        id="name"
        name="name"
        type="text"
        onChange={setter(setNftName)}
      />
      <label htmlFor="price">Target Price</label>
      <input
        value={price}
        id="price"
        name="price"
        type="number"
        onChange={setter(setPrice)}
      />
      <label htmlFor="price">Token URI (media)</label>
      <input
        value={tokenURI}
        id="tokenURI"
        name="tokenURI"
        type="file"
        onChange={setter(setTokenURI)}
      />

      <button bg="blue" type="submit">
        Send Transaction
      </button>
    </FormWrapper>
  );
};

export default CreateNewNFT;
