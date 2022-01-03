import React from "react";
import { AllCards } from "../../assets/images";
import { allCardIndexes } from "../../utils/constants";
import styles from "./poker-card.module.css";

function PokerCard({ card }) {
  let ImagePosition = 0;

  for (const position in allCardIndexes) {
    let denomination = allCardIndexes[position].denomination;
    let suit = allCardIndexes[position].suit;

    if (card.denomination == denomination && card.suit == suit) {
      ImagePosition = -1 * position * 150 - 150;
    }
  }

  return (
    <div
      className={`${styles["container"]}`}
      style={{
        background: `url(${AllCards.src})`,
        backgroundPosition: ImagePosition,
      }}
    ></div>
  );
}

export { PokerCard };
