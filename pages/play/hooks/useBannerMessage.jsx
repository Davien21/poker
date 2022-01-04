import React from "react";
import { determineWinner } from "../../../services/pokerService";
import banner from "../../../utils/bannerConfig";

function useBannerMessage({
  status,
  winner,
  playerRankStatus,
  dealerRankStatus,
  playerRank,
  dealerRank,
}) {
  const message = (
    <div>
      <span>You {status} with the</span>
      {status === "Tie" && (
        <>
          <span className="mx-1">Dealer.</span>
          <div>
            <span>You both had an Equal</span>
            <span className="underline">{playerRank}</span>
          </div>
        </>
      )}
      <span className="mx-1 underline">{playerRank}</span>
      {status !== "Tie" && !winner.includes("tie") && (
        <>
          <span className="mr-1">
            hand!, which is {playerRankStatus} ranked than the {`Dealer's`}
          </span>
          <span className="underline">{dealerRank}</span>
        </>
      )}
      {status !== "Tie" && winner.includes("tie") && (
        <>
          <span className="">hand!, the Dealer also had a</span>
          <span className="underline mx-1">{dealerRank}</span>
          <span>but {dealerRankStatus} ranked.</span>
        </>
      )}
    </div>
  );
  const type = status === "Won" ? "success" : "error";
  return { message, type };
}

export default useBannerMessage;
