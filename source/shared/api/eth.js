import detectEthereumProvider from "@metamask/detect-provider";

const requestEthAccount = async () => {
  // eslint-disable-next-line no-undef
  const user = await ethereum.request({ method: "eth_requestAccounts" });
  console.log("user:: inside requestEthAccount", { user });
  return user;
};

const blockchainMap = { 1: "mainnet", 3: "ropsten", 4: "rinkely" };

const initEthProvider = async () => {
  const response = await detectEthereumProvider();
  const data = await response;
  /**
   * { selectedAddress: "0x80b2b6acbb2744859c04c7da78373dc62f523398"
networkVersion(pin): "1"
chainId(pin): "0x1"
_state,
_rpcEngine
*/
  console.log("response ####", { data, _State: data._state });
  return { web3Provider: data, userData: data._state };
};
export { requestEthAccount, initEthProvider };
