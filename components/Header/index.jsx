import React from "react";
import { LogoIcon, MenuIcon } from "../../assets/images";
import Link from "next/link";

import styles from "./header.module.css";
import { CustomSearch, WalletButton } from "../../components";
import useSearchMarket from "../../hooks/useSearchMarket";

function Header({ onSetOpenSideBar }) {
  const { searchNames, handleSearchMarket } = useSearchMarket();

  return (
    <header
      className={`container ${styles.container} flex justify-items-stretch items-center py-4 `}
    >
      <div className="grid w-full grid-cols-10">
        <Link href="/">
          <div className="col-span-8 md:col-span-2 flex">
            <div className="flex items-center cursor-pointer">
              <div>
                <LogoIcon />
              </div>
              <div className="pl-2">
                <span className="text-xl">Lynxie</span>
              </div>
            </div>
          </div>
        </Link>
        <div className="col-span-6 lg:col-span-4 hidden md:flex items-center gap-x-2">
          <ul className="grid grid-cols-11 items-center w-full text-center">
            <li className="col-span-3">
              <Link href="/market">Explore</Link>
            </li>
            <li className="col-span-4">
              <Link href="/collection">View Collection</Link>
            </li>
            <li className="col-span-4 xl:col-span-3">
              <Link href="/create">Upload NFT</Link>
            </li>
          </ul>
        </div>
        <div className="hidden lg:flex col-span-4 gap-x-4">
          <div className="flex-1">
            <CustomSearch list={searchNames} onSearch={handleSearchMarket} />
          </div>
          <div>
            <WalletButton />
          </div>
        </div>
        <div className="col-span-2 flex justify-end">
          <MenuIcon
            onClick={() => onSetOpenSideBar(true)}
            className="lg:hidden cursor-pointer"
          />
        </div>
      </div>
    </header>
  );
}

export { Header };
