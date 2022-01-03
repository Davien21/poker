import { ethers } from "ethers";
import { toast } from "react-toastify";
import { PokerAbi } from "../contracts";
import { pokerContractAddress } from "../utils/constants";

export const connectToMetaMask = async (setError) => {
  try {
    if (!hasEthereum()) return false;

    const address = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return address;
  } catch (error) {
    console.log(error);
    if (setError) setError(error.message ?? error.toString());
    return false;
  }
};

export function getActiveWallet() {
  if (!hasEthereum()) return false;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const address = signer.provider.provider.selectedAddress;
  return address;
}

export function hasEthereum() {
  return window.ethereum ? true : false;
}

export async function getCurrentNetwork() {
  if (!hasEthereum()) return false;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const network = (await signer.provider._networkPromise).name;
  return network;
}

export function listenToAccountChanges(handler) {
  if (!hasEthereum()) return false;

  window.ethereum.on("accountsChanged", async (accounts) => {
    handler(accounts[0]);
  });
}

export function listenToNetworkChanges(handler) {
  if (!hasEthereum()) return false;

  window.ethereum.on("chainChanged", async () => {
    const network = await getCurrentNetwork();
    console.log({ network });
    if (network && network !== "mumbai") {
      return toast.error("Please Switch to the Mumbai Test Network");
    } else {
      toast.success("You successfully switched to the Rinkeby Test Network");
      // handler(network);
    }
  });
}

export async function unmountEthListeners() {
  window.ethereum.removeListener("chainChanged", () => {});
  window.ethereum.removeListener("accountsChanged", () => {});
  window.ethereum.removeListener("message", () => {});
}

export async function getPokerGameContract(signer) {
  try {
    if (!hasEthereum()) return false;

    return new ethers.Contract(pokerContractAddress, PokerAbi.abi, signer);
  } catch (err) {
    console.log("failed to load contract", err);
  }
}
