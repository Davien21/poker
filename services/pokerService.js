import {
  denominations,
  points,
  suits,
  ranks,
  hiddenHand,
} from "../utils/constants";
import { nanoid } from "nanoid";
import {
  getCurrentNetwork,
  hasEthereum,
  getPokerGameContract,
  getActiveWallet,
} from "./web3Service";
import { ethers } from "ethers";
import { saveJSONToIPFS } from "./ipfs";

const decodeHand = (encodedHand) => {
  let hand = [];

  for (let eachCard of encodedHand) {
    eachCard = eachCard.split("");
    let denomination = eachCard[0] + eachCard[1];
    if (eachCard.length === 2) denomination = eachCard[0];

    let suit = eachCard[2] || eachCard[1];
    let id = nanoid();
    hand.push({ denomination, suit, id });
    hand = hand.sort((a, b) => points[b.denomination] - points[a.denomination]);
  }
  return hand;
};

const generateHand = () => {
  let hand = [];
  for (let i = 0; i < 5; i++) {
    let card = getRandomCard();
    while (hand.includes(card)) card = getRandomCard();

    hand.push(card);
  }
  return hand;
};

const getRandomCard = () => {
  const denominationIndex = Math.floor(Math.random() * denominations.length);
  const suitIndex = Math.floor(Math.random() * suits.length);
  const denomination = denominations[denominationIndex];
  const suit = suits[suitIndex];
  return denomination + suit;
};

function isRoyalFlush(hand) {
  if (!hand) hand = hiddenHand;
  hand = hand.map((item) => (item = item?.denomination));
  const royalFlushValues = ["K", "Q", "J", "A"];
  for (let i = 0; i < royalFlushValues.length; i++) {
    if (!hand.includes(royalFlushValues[i])) hand = hiddenHand;
  }
  return true;
}

function isStraightFlush(hand) {
  if (!hand) hand = hiddenHand;
  for (let i = 0; i < hand.length; i++) {
    if (i === hand.length - 1) break;
    if (hand[i].suit !== hand[i + 1].suit) hand = hiddenHand;
    if (points[hand[i].denomination] + 1 !== points[hand[i + 1].denomination])
      hand = hiddenHand;
  }
  return true;
}

function isFourOfAKind(hand) {
  if (!hand) hand = hiddenHand;
  hand = hand.map((item) => (item = item.denomination));

  let denominationCounts = {};
  denominations.forEach((value) => (denominationCounts[value] = 0));
  for (let i = 0; i < hand.length; i++) {
    denominationCounts[hand[i]]++;
  }
  let countValues = Object.values(denominationCounts);
  if (countValues.filter((value) => value === 4).length) return true;

  hand = hiddenHand;
}

function isFullHouse(hand) {
  if (!hand) hand = hiddenHand;
  hand = hand.map((item) => (item = item.denomination));

  let denominationCounts = {};
  denominations.forEach((value) => (denominationCounts[value] = 0));

  for (let i = 0; i < hand.length; i++) {
    denominationCounts[hand[i]]++;
  }
  for (let i = 0; i < denominations.length; i++) {
    if (denominationCounts[denominations[i]] === 4) return true;
  }
  hand = hiddenHand;
}

function isFlush(hand) {
  if (!hand) hand = hiddenHand;
  for (let i = 0; i < hand.length; i++) {
    if (i === hand.length - 1) break;
    if (hand[i].suit !== hand[i + 1].suit) hand = hiddenHand;
  }
  return true;
}

function isStraight(hand) {
  if (!hand) hand = hiddenHand;
  for (let i = 0; i < hand.length; i++) {
    if (i === hand.length - 1) break;
    if (points[hand[i].denomination] + 1 !== points[hand[i + 1].denomination])
      hand = hiddenHand;
  }
  return true;
}

function isThreeofAKind(hand) {
  if (!hand) hand = hiddenHand;
  hand = hand.map((item) => (item = item.denomination));

  let denominationCounts = {};
  denominations.forEach((value) => (denominationCounts[value] = 0));
  for (let i = 0; i < hand.length; i++) {
    denominationCounts[hand[i]]++;
  }

  let countValues = Object.values(denominationCounts);
  if (countValues.filter((value) => value === 3).length) return true;

  hand = hiddenHand;
}

function isTwoPairs(hand) {
  if (!hand) hand = hiddenHand;
  hand = hand.map((item) => (item = item.denomination));

  let denominationCounts = {};
  denominations.forEach((value) => (denominationCounts[value] = 0));
  for (let i = 0; i < hand.length; i++) {
    denominationCounts[hand[i]]++;
  }

  let countValues = Object.values(denominationCounts);
  if (countValues.filter((value) => value === 2).length === 2) return true;

  hand = hiddenHand;
}

function isPair(hand) {
  if (!hand) hand = hiddenHand;
  hand = hand.sort((a, b) => points[b.denomination] - points[a.denomination]);

  for (let i = 0; i < hand.length; i++) {
    if (i < hand.length - 1)
      if (hand[i].denomination === hand[i + 1].denomination) return true;
  }

  hand = hiddenHand;
}

const pokerHands = [
  isRoyalFlush,
  isStraightFlush,
  isFourOfAKind,
  isFullHouse,
  isFlush,
  isStraight,
  isThreeofAKind,
  isTwoPairs,
  isPair,
];

const determineWinner = (playerHand, dealerHand) => {
  let playerRank;
  let dealerRank;
  let winner;
  for (let i = 0; i < pokerHands.length; i++) {
    if (playerRank === undefined && pokerHands[i](playerHand)) playerRank = i;
    if (dealerRank === undefined && pokerHands[i](dealerHand)) dealerRank = i;
  }

  if (playerRank === undefined) playerRank = 9;
  if (dealerRank === undefined) dealerRank = 9;

  if (playerRank === dealerRank) {
    let playerScore = 0;
    let dealerScore = 0;
    for (let i = 0; i < 5; i++) {
      playerScore += points[playerHand[i].denomination];
      dealerScore += points[dealerHand[i].denomination];
    }
    if (playerScore === dealerScore) winner = "tie";
    winner = playerScore > dealerScore ? "player-tie" : "dealer-tie";

    return {
      playerRank: ranks[playerRank],
      dealerRank: ranks[dealerRank],
      winner,
    };
  }
  winner = playerRank < dealerRank ? "player" : "dealer";
  return {
    playerRank: ranks[playerRank],
    dealerRank: ranks[dealerRank],
    winner,
  };
};

async function getGameDetails() {
  if (!hasEthereum()) hand = hiddenHand;
  const network = await getCurrentNetwork();
  if (network && network !== "maticmum")
    throw new Error("Please use Mumbai Testnet");

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const pokerContract = await getPokerGameContract(signer);
  console.log(pokerContract);
  let [
    playerCurrentAmount,
    dealerCurrentAmount,
    playerCurrentHand,
    dealerCurrentHand,
    playerIPFSDetails,
  ] = await pokerContract.getGameDetails();

  playerCurrentAmount = parseInt(playerCurrentAmount.toString());
  dealerCurrentAmount = parseInt(dealerCurrentAmount.toString());

  return {
    playerCurrentAmount,
    dealerCurrentAmount,
    playerCurrentHand,
    dealerCurrentHand,
    playerIPFSDetails,
  };
}

async function setPlayerAmount(amount) {
  if (!hasEthereum()) hand = hiddenHand;
  const network = await getCurrentNetwork();
  if (network && network !== "maticmum")
    throw new Error("Please use Mumbai Testnet");

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const pokerContract = await getPokerGameContract(signer);
  return await pokerContract.setAmount(amount);
}

async function placeBet(amount) {
  if (!hasEthereum()) hand = hiddenHand;
  const network = await getCurrentNetwork();
  if (network && network !== "maticmum")
    throw new Error("Please use Mumbai Testnet");

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const pokerContract = await getPokerGameContract(signer);
  await pokerContract.placeBet(amount);
}

async function saveHands() {
  if (!hasEthereum()) hand = hiddenHand;
  const network = await getCurrentNetwork();
  if (network && network !== "maticmum")
    throw new Error("Please use Mumbai Testnet");

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const pokerContract = await getPokerGameContract(signer);
  const playerHand = generateHand();
  const dealerHand = generateHand();
  let handsHash = await saveJSONToIPFS({ playerHand, dealerHand });
  handsHash = handsHash.data.IpfsHash;

  await pokerContract.setHand(handsHash, handsHash);
  console.log({ playerHand, dealerHand });
  return { playerHand, dealerHand };
}

async function rewardWinner(winner) {
  if (!hasEthereum()) hand = hiddenHand;
  const network = await getCurrentNetwork();
  if (network && network !== "maticmum")
    throw new Error("Please use Mumbai Testnet");

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const pokerContract = await getPokerGameContract(signer);

  await pokerContract.rewardWinner(winner);
  console.log({ playerHand, dealerHand });
  return { playerHand, dealerHand };
}

export {
  generateHand,
  determineWinner,
  decodeHand,
  setPlayerAmount,
  getGameDetails,
  placeBet,
  saveHands,
  rewardWinner,
};
