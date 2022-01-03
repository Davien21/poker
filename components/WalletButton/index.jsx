import React from "react";
import { ConnectButton } from "./ConnectButton";
import { DisconnectWalletButton } from "./DisconnectWallet";
// import { useAppContext } from "../../contexts/appContext";

function WalletButton() {
  const { isConnected } = { isConnected: true };

  return isConnected ? <DisconnectWalletButton /> : <ConnectButton />;
}

export { WalletButton };
