import autodux from "autodux";

export const {
  reducer,
  initial,
  slice,
  actions: { setEthProvider, setError: setEthProviderError },
  selectors: { getWeb3, getError: getEthProviderError },
} = autodux({
  slice: "web3API",
  initial: {
    ethProvider: null,
    error: null,
  },
});
