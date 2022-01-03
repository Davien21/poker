import React from "react";
import Head from "next/head";
import styles from "./create.module.css";
import { BigUploadIcon } from "../../assets/images";
import DragAndDropInput from "../../components/DragAndDropInput";

function CreatePage(props) {
  return (
    <>
      <Head>
        <link rel="icon" href="./favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Add a new NFT to your collection and list it on the Lynxie Marketplace."
        />
        <meta name="keywords" content="Lynxie, NFTs, NFT marketplace"></meta>
        <title>Lynxie | Upload NFTs </title>
      </Head>
      <main className={`${styles["container"]} container`}>
        <section className="my-10 md:mt-10">
          <div className="grid grid-cols-1 md:grid-cols-7 lg:grid-cols-5">
            <div className="md:col-span-4 lg:col-span-3">
              <div className="mb-5 md:mt-5">
                <h1 className="text-4xl ">
                  <span className="">Create a new</span>
                  <span className={`mx-2 ${styles["gradient-text"]}`}>NFT</span>
                  <span>on Lynxie</span>
                </h1>
              </div>
              <div className="mt-5 mb-5">
                <p className="text-xl mb-1">Upload file</p>
                <p className="app-text-grey">
                  Drag and drop or choose your file to upload.
                </p>
              </div>
              <DragAndDropInput />

              <p className="my-4 text-xl">Item Details</p>
              <div></div>
            </div>
            <div className="md:col-span-3 lg:col-span-2"></div>
          </div>
        </section>
      </main>
    </>
  );
}

export default CreatePage;
