import { createContext, useContext, useState } from "react";

import NFTData from "../data/nfts.json";
import CollectionData from "../data/collection.json";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [AllNFTs, setNFTs] = useState(NFTData);
  const [displayedNFTs, setDisplayedNFTs] = useState(NFTData);

  const [NFTCollection, setNFTCollection] = useState(CollectionData);

  const resetMarket = () => setDisplayedNFTs(AllNFTs);

  return (
    <AppContext.Provider
      value={{
        AllNFTs,
        setNFTs,
        displayedNFTs,
        setDisplayedNFTs,
        resetMarket,
        NFTCollection,
        setNFTCollection,
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
