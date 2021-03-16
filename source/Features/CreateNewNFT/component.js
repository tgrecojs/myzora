import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { compose } from "ramda";
import { FormWrapper } from "../../shared/styled";
import { send, setForm } from "./reducer";

const noop = () => {};

const CreateNewNFT = (props) => {
  const { form } = useSelector((state) => state.formState);
  console.log("form in creattenewNFT", form);
  console.log("setform", setForm());
  const dispatch = useDispatch();
  // console.log("dispatch", dispatch);
  // const initForm = compose(dispatch, setForm);

  const [nftName, setNftName] = useState("");
  const [price, setPrice] = useState(0);
  const [tokenURI, setTokenURI] = useState("");
  const [tempForm, setTempForm] = useState(form);

  const setter = (set) => (e) => {
    const { target } = e;
    const { value } = target;
    console.log({ value });
    set(value);
  };
  // const sendTransaction = compose(dispatch, send);
  function handleSubmit(e) {
    e.preventDefault();
    const newForm = { nftName, price, tokenURI };
    //dispatch setform
    setTempForm({ ...tempForm, newForm });
    dispatch({ type: setForm().type, payload: newForm });
    console.log("newform data", newForm);
  }

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
        type="text"
        onChange={setter(setTokenURI)}
      />
      <button
        bg="blue"
        onClick={() => {
          console.log("sending values", { nftName, price, tokenURI });
        }}
      >
        Send Transaction
      </button>
    </FormWrapper>
  );
};

export default CreateNewNFT;
