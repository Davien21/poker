import { useEffect } from "react";
import styles from "./sideBar.module.css";

import Link from "next/link";
import { useRouter } from "next/router";
import { CloseButton, CustomSearch, WalletButton } from "../../components";

import {
  MarketIcon,
  UploadIcon,
  CollectionIcon,
  HomeIcon,
  LogoIcon,
} from "../../assets/images";
import useRouteChangeHandler from "../../hooks/useRouteChangeHandler";
import useSearchMarket from "../../hooks/useSearchMarket";
import { useAppContext } from "../../contexts/appContext";

function SideBar({ isOpen, onSetOpenSideBar }) {
  const { routeChanging } = useRouteChangeHandler();
  const { resetMarket } = useAppContext();

  const activeRoute = useRouter().pathname;

  const containerClass = (() => {
    if (isOpen) return `${styles["container"]} ${styles["active"]}`;
    return `${styles["container"]}`;
  })();

  const activeIconClass = (route) => {
    let isBaseRoute = (r) => r === "/" || r === "//";
    if (isBaseRoute(route) && isBaseRoute(activeRoute)) {
      return `${styles["icon-container"]} pl-6 xl:pl-10 ${styles["active"]}`;
    }

    if (!isBaseRoute(route) && activeRoute.includes(route))
      return `${styles["icon-container"]} pl-6 xl:pl-10 ${styles["active"]}`;

    return `${styles["icon-container"]} pl-6 xl:pl-10`;
  };

  useEffect(() => {
    if (routeChanging) onSetOpenSideBar(false);
    resetMarket();
  }, [routeChanging, onSetOpenSideBar]);

  const { searchNames, handleSearchMarket } = useSearchMarket();

  return (
    <div className={`${containerClass} lg:hidden`}>
      <div className="">
        <CloseButton onClick={() => onSetOpenSideBar(false)} />
      </div>
      <div className="flex items-center gap-x-2 cursor-pointer pt-5 mb-8 pl-6 xl:pl-10">
        <div>
          <LogoIcon />
        </div>
        <div className="pl-2">
          <span className="text-xl">Lynxie</span>
        </div>
      </div>

      <div className="my-10 pl-6 pr-3">
        <CustomSearch list={searchNames} onSearch={handleSearchMarket} />
      </div>
      <ul>
        <li className="flex mb-8">
          <Link href="/">
            <div className={activeIconClass("/")}>
              <HomeIcon className={`${styles["icon"]}`} />
              <span className="pl-4">Home</span>
            </div>
          </Link>
        </li>
        <li className="flex mb-8">
          <Link href="/market">
            <div className={activeIconClass("/market")}>
              <MarketIcon className={`${styles["icon"]}`} />
              <span className="pl-4">Explore</span>
            </div>
          </Link>
        </li>
        <li className="flex mb-8">
          <Link href="/create">
            <div className={activeIconClass("/create")}>
              <UploadIcon className={`${styles["icon"]}`} />
              <span className="pl-4">Upload NFT</span>
            </div>
          </Link>
        </li>

        <li className="flex mb-8">
          <Link href="/collection">
            <div className={activeIconClass("/collection")}>
              <CollectionIcon className={`${styles["icon"]}`} />
              <span className="pl-4">Your NFTs</span>
            </div>
          </Link>
        </li>
      </ul>
      <div className="px-4">
        <WalletButton />
      </div>
    </div>
  );
}

export { SideBar };
