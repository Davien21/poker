import React from "react";

import styles from "./nft-card.module.css";
import { CurrencyIcon } from "../../assets/images";
import { Button } from "../../components";

function NFTCard({ details }) {
  
  const currencyIconClass = (() => {
    const currency = details.price.currency.toLowerCase();
    return `${styles["currency-icon"]} ${styles[currency]}`;
  })();

  return (
    <div className={`${styles["container"]} pb-4`}>
      <div className={styles["nft-image"]}>
        <img src={details?.image} width={256} height={384} />
      </div>
      <hr className="" />
      <div className="my-4 px-4">
        <div className="flex justify-between flex-wrap items-center">
          <div className="mb-2">
            <span className={`${styles["name"]} text-base`}>
              {details?.name}
            </span>
          </div>
          <div className="flex items-center ml-auto">
            <div className="pr-2">
              <CurrencyIcon className={currencyIconClass} />
            </div>
            <span className={`gradient-text font-medium`}>
              {details?.price.value}
            </span>
          </div>
        </div>
        <div className="flex justify-between flex-wrap items-center">
          <div>
            <span className="text-base">#{details?.token_id}</span>
          </div>
          <div className="flex items-center">
            <span className={`gradient-text font-medium pr-1`}>
              {details?.amount}{" "}
            </span>
            <span className="">In Stock</span>
          </div>
        </div>
      </div>
      {/* <hr className="mb-4" /> */}
      <div className="px-4">
        <Button form="secondary">Buy Now</Button>
      </div>
    </div>
  );
}

export { NFTCard };
