import React from "react";
import { determineWinner } from "../../../services/pokerService";
import banner from "../../../utils/bannerConfig";

function useBannerMessage({ playerHand, dealerHand }) {
  const outcome = determineWinner(playerHand, dealerHand);
  const { playerRank, dealerRank, winner } = outcome;
  console.log(outcome);
  let status = winner.includes("player") ? "Won" : "Lost";

  if (winner.includes("player") === "player") status = "Won";
  if (winner === "dealer") status = "Lost";
  if (winner === "tie") status = "Tied";

  let playerRankStatus = status === "Won" ? "higher" : "lower";
  let dealerRankStatus = status !== "Won" ? "higher" : "lower";

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
            hand!, which is {playerRankStatus} ranked than the Dealer's
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
  return { message, type, winner };
}

export default useBannerMessage;
