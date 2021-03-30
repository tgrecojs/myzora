import detectEthereumProvider from "@metamask/detect-provider";

const requestEthAccount = async () => {
  // eslint-disable-next-line no-undef
  const user = await ethereum.request({ method: "eth_requestAccounts" });
  console.log("user:: inside requestEthAccount", { user });
  return user;
};

export const ethNetworkLookup = { 1: "mainnet", 3: "ropsten", 4: "rinkeby" };

const initEthProvider = async () => {
  const response = await detectEthereumProvider();
  const data = await response;
  return { ...data, address: data.selectedAddress }
};
export { requestEthAccount, initEthProvider };
