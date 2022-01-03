import React from "react";
import { useAppContext } from "../contexts/appContext";

function useSearchMarket(props) {
  const { AllNFTs, setDisplayedNFTs } = useAppContext();
  const searchNames = AllNFTs.map((item) => item.name);

  function handleSearchMarket(value) {
    if (!value) return setDisplayedNFTs(AllNFTs);
    value = value.toLowerCase();
    const results = AllNFTs.filter((nft) =>
      nft.name.toLowerCase().includes(value)
    );
    setDisplayedNFTs(results);
  }

  return { searchNames, handleSearchMarket };
}

export default useSearchMarket;
