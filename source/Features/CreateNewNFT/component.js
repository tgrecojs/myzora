import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FormWrapper } from "../../shared/styled";
// import { send } from "./reducer";

const noop = () => {};
const CreateNewNFT = () => {
  const dispatch = useDispatch();

  const [nftName, setNftName] = useState("");
  const [price, setPrice] = useState(0);

  const setter = (set) => (e) => {
    const { target } = e;
    const { value } = target;
    console.log({ value });
    set(value);
  };

  // const sendTransaction = compose(dispatch, send);

  return (
    <FormWrapper as="form" onSubmit={(e) => e.preventDefault()} py={3}>
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
      <button
        bg="blue"
        onClick={() => {
          console.log("sending values", { nftName, price });
        }}
      >
        Send Transaction
      </button>
    </FormWrapper>
  );
};

export default CreateNewNFT;
