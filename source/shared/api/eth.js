const requestEthAccount = async () => {
  // eslint-disable-next-line no-undef
  const user = await ethereum.request({ method: "eth_requestAccounts" });
  console.log("user:: inside requestEthAccount", { user });
  return user;
};

export { requestEthAccount };
