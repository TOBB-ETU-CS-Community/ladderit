import { createContext, useRef, useState, useEffect } from "react";
import { Contract, providers } from "ethers";
import { MAIN_CONTRACT_ADDRESS, MAIN_CONTRACT_ABI } from "../constants";
import Web3Modal from "web3modal";

export const ContextAPI = createContext();

export function ContextProvider({ children }) {
  const [walletConnected, setWalletConnected] = useState(false);
  const [address, setAddress] = useState("");
  const web3ModalRef = useRef();

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 80001) {
      alert("Change the network to Mumbai Chain");
      throw new Error("Change the network to Mumbai Chain");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  const getAddress = async () => {
    const initial = await getProviderOrSigner();
    const initialAddress = initial.provider.selectedAddress;
    setAddress(initialAddress);
  };

  console.log(address);

  const contractInstance = (providerOrSigner) => {
    return new Contract(
      MAIN_CONTRACT_ADDRESS,
      MAIN_CONTRACT_ABI,
      providerOrSigner
    );
  };

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      await getAddress();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "mumbai",
        providerOptions: [],
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, [walletConnected]);

  return (
    <ContextAPI.Provider
      value={{
        walletConnected,
        address,
        connectWallet,
        getProviderOrSigner,
        contractInstance,
      }}>
      {children}
    </ContextAPI.Provider>
  );
}
