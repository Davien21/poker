import React from "react";
import { NFTCard } from "..";
import { EmptySearchIcon } from "../../assets/images";
import { useAppContext } from "../../contexts/appContext";

function NFTDisplay({ limit }) {
  const { displayedNFTs } = useAppContext();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {displayedNFTs?.map((nft, index) => (
          <NFTCard key={index + nft.token_id} details={nft} />
        ))}
      </div>
      {!displayedNFTs.length && (
        <div className="flex flex-col items-center mt-10 md:mt-20">
          <EmptySearchIcon />
          <div className="text-lg mt-10">
            <span>There are no such</span>
            <span className="gradient-text mx-1">NFTs</span>
            <span>in the marketplace.</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default NFTDisplay;
