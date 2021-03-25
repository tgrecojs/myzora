import { useEffect } from "react";

const initEthProvider = async () => {
  const response = await detectEthereumProvider();
  /**
   * { selectedAddress: "0x80b2b6acbb2744859c04c7da78373dc62f523398"
networkVersion(pin): "1"
chainId(pin): "0x1"
_state,

*/
  return response;
};

const withWeb3Provider = (Component) => ({ onConnectProvider, ...props }) => {
  useEffect(() => {
    onConnectProvider();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Component {...props} />;
};

export default withWeb3Provider;
