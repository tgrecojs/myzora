// import { useEffect, useState } from "react";

// const getChain = async () => {
//   const eth = window.ethereum;
//   const connection = await eth.request({ method: "eth_chainId" });
//   return connection;
// };
// const noop = () => {};
// const useMetamask = () => {
//   const [chain, setChain] = useState("");
//   // useEffect(() => {
//   //   const eth = window.ethereum;
//   //   console.log({ eth });
//   //   if (eth) {
//   //     eth.request({ method: "eth_chainId" }).then((res) => setChain(res));
//   //   }
//   //   eth.on("chainChanged", (x) => {
//   //     window.location.reload();
//   //   });
//   // }, []);
//   return {
//     chain,
//   };
// };

// export default useMetamask;
