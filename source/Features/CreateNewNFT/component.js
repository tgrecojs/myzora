import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { compose } from "ramda";
import { FormWrapper } from "../../shared/styled";

const noop = () => {};

const CreateNewNFT = ({
  defaultName = "Default NFT Name",
  defaultPrice = 0,
  defaultmediaData = "",
  onSubmit,
  status,
}) => {
  const dispatch = useDispatch();
  // console.log("dispatch", dispatch);
  // const initForm = compose(dispatch, setForm);

  const [nftName, setNftName] = useState("");
  const [price, setPrice] = useState(0);
  const [mediaData, setMediaData] = useState({});
  const [fileName, setFileName] = useState("")

  const setter = (set) => (e) => {
    const { target } = e;
    const { value } = target;
    console.log({ value, e });
    set(value);
  };

  const setFiles = (set) => (e) => {
    const { target } = e;
    const { value } = target;
    console.log({ value, e, files: value.files });
    set(value.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nftName, price, tokenUri: mediaData });
    setNftName("");
    setPrice("");
    setMediaData({name: ''});
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
        value={fileName}
        id="mediaData"
        name="mediaData"
        type="file"
        onChange={e => {
          console.log("e.target ####", e.target, e.target.files)
          const files = e.target.files;
          setMediaData(files)
          console.log("files ##", files)
          setFileName(files[0].name)
        }}
      />

      <button bg="blue" type="submit">
        Send Transaction
      </button>
    </FormWrapper>
  );
};

export default CreateNewNFT;
