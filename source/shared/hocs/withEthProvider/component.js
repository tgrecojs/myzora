import { useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";

const withWeb3Provider = (Component) => (props) => {
  useEffect(() => {
    async function initEthProvider() {
      const provider = await detectEthereumProvider();
      if (provider) {
        console.log("setting provider ###", provider, {
          providerIsEth: provider === window.ethereum,
        });
        props.setEthProvider(provider);
      } else {
        props.setEthProviderError(
          "Minting NFTs requires your browser to have the Metamask extension installed!"
        );
      }
    }
    initEthProvider();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Component {...props} />;
};

export default withWeb3Provider;
