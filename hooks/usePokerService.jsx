import React, { useEffect } from "react";
import { getCurrentNetwork, hasEthereum } from "../services/web3Service";
import { ethers } from "ethers";
import { logContract } from "../services/pokerService";

function usePokerContract() {
  useEffect(() => {
    (async function () {
      await logContract;
    })();
  });

  return {};
}

export default usePokerContract;
