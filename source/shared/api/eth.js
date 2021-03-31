import detectEthereumProvider from "@metamask/detect-provider";

const requestEthAccount = async () => {
  // eslint-disable-next-line no-undef
  const user = await ethereum.request({ method: "eth_requestAccounts" });
  console.log("user:: inside requestEthAccount", { user });
  return user;
};

const watchChainId = async () => {
  // eslint-disable-next-line no-undef
  const listener = await ethereum.request('accountsChanged', () => window.location.reload())
  console.log("user:: inside requestEthAccount", { listener });
  return listener
};

const watchCurrentAccount = async () => {
  // eslint-disable-next-line no-undef
  const user = await ethereum.on('accountsChanged')
  return user;
};


export const ethNetworkLookup = { 1: "mainnet", 3: "ropsten", 4: "rinkeby" };

const initEthProvider = async () => {
  const provider = await detectEthereumProvider();

  return { ...provider, address: provider.selectedAddress }
};
export { requestEthAccount, initEthProvider, watchChainId };
