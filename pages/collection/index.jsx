import Head from "next/head";
import React from "react";
import { CollectionCard } from "../../components";
import { EmptySearchIcon } from "../../assets/images";
import { useAppContext } from "../../contexts/appContext";
import styles from "./collection.module.css";
import Link from "next/link";

function NFTCollection() {
  const { NFTCollection } = useAppContext();
  let cardContainerClasses = "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4";
  if (NFTCollection.length < 4)
    cardContainerClasses = "flex flex-wrap justify-center";

  return (
    <>
      <Head>
        <link rel="icon" href="./favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="View all your NFTs neatly arranged, all in one place."
        />
        <meta name="keywords" content="Lynxie, NFTs, NFT marketplace"></meta>
        <title>Lynxie | Your collection</title>
      </Head>
      <main className={`${styles["container"]} container`}>
        <section>
          <div className="text-center my-10 md:mt-10">
            <h1 className="text-4xl ">
              <span className="">View your</span>
              <span className={`mx-2 ${styles["gradient-text"]}`}>NFT</span>
              <span>Collection</span>
            </h1>
            <p className="my-2">
              You can add a new NFT or even List existing ones on the
              marketplace.
            </p>
          </div>
        </section>
        <section>
          <div className="my-10 md:mt-10">
            <div>
              <div className={`${cardContainerClasses} md:gap-5`}>
                {NFTCollection?.map((nft, index) => (
                  <div key={index + nft.token_id} className="mb-5">
                    <CollectionCard details={nft} />
                  </div>
                ))}
              </div>
              {!NFTCollection.length && (
                <div className="text-center flex flex-col items-center mt-10 md:mt-10">
                  <EmptySearchIcon />
                  <div className="text-lg mt-10">
                    <span>
                      Oops... looks like you're missing some NFTs there.
                    </span>
                  </div>
                  <div className={`${styles["market-link"]}`}>
                    <Link href="/market">Go to the marketplace.</Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default NFTCollection;
