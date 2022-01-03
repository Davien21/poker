import Head from "next/head";
import React from "react";

import styles from "./market.module.css";
import { ToggleFilter } from "../../components";
import { useAppContext } from "../../contexts/appContext";
import NFTDisplay from "../../components/NFTDisplay";

function Market() {
  const { displayedNFTs } = useAppContext();
  return (
    <>
      <Head>
        <link rel="icon" href="./favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Buy, sell and discover NFTs on the Lynxie marketplace"
        />
        <meta
          name="keywords"
          content="Lynxie, Marketplace NFTs, NFT marketplace, Buy NFT, Sell NFT"
        ></meta>
        <title>Lynxie | Market</title>
      </Head>
      <main className={`${styles["container"]} container`}>
        <section>
          {displayedNFTs.length > 0 && (
            <div className="">
              <ToggleFilter />
            </div>
          )}
          <div className="pt-10 pb-20">
            <NFTDisplay limit={4} />
          </div>
        </section>
      </main>
    </>
  );
}

export default Market;
