import Head from "next/head";
import React from "react";
import { pokerArt1, pokerArt2, pokerArt3 } from "../assets/images/jpgs";
import styles from "./index-page.module.css";
import Image from "next/image";
import { Button } from "../components";
import Link from "next/link";
import NFTDisplay from "../components/NFTDisplay";

function IndexPage() {
  return (
    <>
      <Head>
        <link rel="icon" href="./favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Lynxie is an NFT marketplace where people can come and upload and sell their NFTs."
        />
        <meta name="keywords" content="Lynxie, NFTs, NFT marketplace"></meta>
        <title>Poker on Chain | Home</title>
      </Head>
      <main className={`${styles["container"]} container`}>
        <section>
          <div className="flex items-center justify-center my-10 md:mt-16">
            <div className="md:col-start-2 md:col-end-4 xl:col-start-2 xl:col-end-3 mb-16 text- center">
              <div className="flex justify-between text-white">
                <div className={`${styles["stats"]} px-4`}>
                  <span className="block text-2xl">15</span>
                  <span className="block">Games Played</span>
                </div>
                <div className={`${styles["stats"]} px-4`}>
                  <span className="block text-2xl">30</span>
                  <span className="block">Games Won</span>
                </div>
                <div className={`${styles["stats"]} px-4`}>
                  <span className="block text-2xl">3</span>
                  <span className="block">Ties</span>
                </div>
              </div>
              <h1 className="mt-10">
                <span className="text-6xl mr-2 text-white block">Play</span>
                <span className={`text-6xl ${styles["gradient-text"]}`}>
                  Poker on Chain{" "}
                </span>
              </h1>
              <p className="mb-10 text-white text-xl">
                A beautiful game of poker on the Blockchain.
              </p>
              <div className="flex">
                <Link href="/play">
                  <div className={`${styles["digital-art"]} mr-4`}>
                    <div className="flex-1 absolute px-4 z-10 w-full">
                      <div className="w-full flex items-center">
                        <Button form="secondary-white" className="w-full ">
                          Start Playing
                        </Button>
                      </div>
                    </div>
                    <Image src={pokerArt1} width={640} height={847} />
                  </div>
                </Link>
                <Link href="/rules">
                  <div className={`${styles["digital-art"]} `}>
                    <div className="flex-1 absolute px-4 z-10 w-full">
                      <div className="w-full flex items-center">
                        <Button form="secondary-white" className="w-full ">
                          See Rules
                        </Button>
                      </div>
                    </div>
                    <Image src={pokerArt3} width={640} height={960} />
                  </div>
                </Link>
              </div>
              {/* <div className="flex flex-wrap  pb-3 lg:py-4">
                <div className="flex-1 pr-4">
                  <Link href="/market">
                    <div className="text-xl">
                      <Button className="w-full">Start Playing</Button>
                    </div>
                  </Link>
                </div>
                <div className="flex-1">
                  <Link href="/create">
                    <div className="text-xl">
                      <Button form="secondary">See Rules</Button>
                    </div>
                  </Link>
                </div>
              </div> */}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default IndexPage;
