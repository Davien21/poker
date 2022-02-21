import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import Emitter from "../services/emitter";

import {
  connectToMetaMask,
  listenToAccountChanges,
  hasEthereum,
  unmountEthListeners,
  listenToNetworkChanges,
} from "../services/web3Service";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(false);
  const [hasGameData, setHasGameData] = useState(false);
  const [isInitiallyFetched, setIsInitiallyFetched] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [hasMetaMask, setHasMetaMask] = useState(true);
  const [shouldResetApp, setShouldResetApp] = useState(false);

  const handleWalletConnect = useCallback(() => {
    return (async () => {
      const [connectedAccount] = await connectToMetaMask();
      if (!connectedAccount) return false;
      setUser(connectedAccount);
      setIsConnected(true);

      localStorage.setItem("wallet-connection", true);

      return true;
    })();
  }, []);

  const resetValues = useCallback(() => {
    return (async () => {
      setIsConnected(true);

      localStorage.setItem("wallet-connection", true);

      setShouldResetApp(true);
      return true;
    })();
  }, []);

  const handleWalletDisconnect = () => {
    setIsConnected(false);
    setUser(false);
    localStorage.removeItem("wallet-connection");
  };

  const handleAccountChanged = (address) => {
    if (!address) return handleWalletDisconnect();
    resetValues();
  };

  const handleNetworkChanged = () => {
    // if (!address) return handleWalletDisconnect();
    resetValues();
  };

  useEffect(() => {
    if (!isInitiallyFetched) return;

    if (!hasEthereum()) return;
    listenToAccountChanges(handleAccountChanged);
    listenToNetworkChanges(handleNetworkChanged);
    return unmountEthListeners();
  });

  useEffect(() => {
    if (isInitiallyFetched) return;
    if (!hasEthereum()) {
      console.log("Please Install Meta Mask");
      return setHasMetaMask(false);
    }
    const isInjected = localStorage.getItem("wallet-connection");
    if (!isInjected) return setIsInitiallyFetched(true);

    handleWalletConnect();
    setIsInitiallyFetched(true);
    return;
  }, [handleWalletConnect, isInitiallyFetched]);

  useEffect(() => {
 
  }, [hasGameData]);

  return (
    <AppContext.Provider
      value={{
        user,
        isConnected,
        setIsConnected,
        handleWalletConnect,
        handleWalletDisconnect,
        hasMetaMask,
        shouldResetApp,
        setShouldResetApp,
        hasGameData,
        setHasGameData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) throw new Error("useApp must be used inside a `AppProvider`");

  return context;
}
