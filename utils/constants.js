import { nanoid } from "nanoid";

const denominations = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

const points = {
  A: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
};

const suits = ["H", "C", "S", "D"];
// const suits = ["hearts", "clover", "spades", "diamonds"];

const playerHand = [
  {
    denomination: "A",
    suit: "S",
  },
  {
    denomination: "J",
    suit: "C",
  },
  {
    denomination: "K",
    suit: "D",
  },
  {
    denomination: "Q",
    suit: "C",
  },
  {
    denomination: "J",
    suit: "D",
  },
];

const dealerHand = [
  {
    denomination: "2",
    suit: "S",
  },
  {
    denomination: "3",
    suit: "C",
  },
  {
    denomination: "4",
    suit: "D",
  },
  {
    denomination: "5",
    suit: "C",
  },
  {
    denomination: "Q",
    suit: "D",
  },
];

const ranks = [
  "Royal flush",
  "Straight flush",
  "Four of a kind",
  "Full house",
  "Flush",
  "Straight",
  "Three of a kind",
  "Two pairs",
  "Pair",
  "High card",
];

let allCardIndexes = {};
for (let i = 0; i < 52; i++) {
  let card = { denomination: denominations[i], suit: "H" };
  let denomination = denominations[i % 13];
  if (i >= 13 && i <= 25) card = { denomination, suit: "D" };
  if (i >= 26 && i <= 38) card = { denomination, suit: "C" };
  if (i >= 39 && i <= 51) card = { denomination, suit: "S" };
  allCardIndexes[i] = card;
}

const hiddenHand = (() => {
  const hand = [];
  for (let i = 0; i < 5; i++) {
    const id = nanoid();
    hand.push({ denomination: 0, suit: 0, id });
  }

  return hand;
})();


const pokerContractAddress = "0x350D8c623f79CC8178c9107A51B596cE0A2C37F7";

export {
  ranks,
  dealerHand,
  denominations,
  points,
  suits,
  playerHand,
  allCardIndexes,
  hiddenHand,
  pokerContractAddress,
};
