import Head from "next/head";
import { useCallback, useState } from "react";

import styles from "./play.module.css";
import { PlusIcon } from "../../assets/images";
import {
  PokerCard,
  Button,
  ConfettiShower,
  WalletButton,
} from "../../components";
import OptionsModal from "./components/OptionsModal";
import { hiddenHand } from "../../utils/constants";
import useBannerMessage from "./hooks/useBannerMessage";
import banner from "../../utils/bannerConfig";
import { useEffect } from "react";
import usePokerContract from "../../hooks/usePokerService";
import { useAppContext } from "../../contexts/appContext";
import { toast } from "react-toastify";

function PlayPage(props) {
  const { isConnected, setHasGameData, hasGameData } = useAppContext();
  const [playerHand, setPlayerHand] = useState(hiddenHand);
  const [hiddenDealerHand, setHiddenDealerHand] = useState(hiddenHand);
  const [dealerHand, setDealerHand] = useState(hiddenHand);
  const [amount, setAmount] = useState(null);
  const [playerCreditsLeft, setPlayerCreditsLeft] = useState(amount);
  const [dealerCreditsLeft, setDealerCreditsLeft] = useState(amount);
  const [playerBalance, setPlayerBalance] = useState(null);
  const [dealerBalance, setDealerBalance] = useState(null);
  const [bid, setBid] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [hasWonBet, setHasWon] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [shouldOpenModal, setShouldOpenModal] = useState(false);

  const cannotSetBid = isPlaying || !playerCreditsLeft || !dealerCreditsLeft;
  const { getGameInfo, setGameCredits, placeBid, generateHands, giveReward } =
    usePokerContract();
  const handleSelectAmount = async (amount) => {
    const didSetAmount = await setGameCredits(amount);
    if (didSetAmount) {
      toast.success(`Game Credits set to $${amount}`);
      setAmount(amount);
      setPlayerCreditsLeft(amount);
      setPlayerBalance(amount);
      setDealerCreditsLeft(amount);
      setDealerBalance(amount);
    }
  };

  const makeBid = (bid) => {
    const canBid = playerCreditsLeft - bid < 0 || dealerCreditsLeft - bid < 0;
    if (canBid) return;
    setPlayerCreditsLeft((value) => (value -= bid));
    setDealerCreditsLeft((value) => (value -= bid));
    setBid((value) => (value += bid));
  };

  const resetBid = () => {
    setPlayerCreditsLeft(playerBalance);
    setDealerCreditsLeft(dealerBalance);
    setBid(0);
  };

  const resetPlay = () => {
    resetBid();
    setPlayerHand(hiddenHand);
    setDealerHand(hiddenHand);
    if (!hasPlayed) setHasPlayed(true);
  };

  const placeBet = async () => {
    console.log({ playerBalance, bid, dealerBalance });
    const canBet = playerBalance - bid < 0 || dealerBalance - bid < 0;
    if (canBet) return toast.error("Invalid Bid");
    const didPlaceBid = await placeBid(bid);
    if (didPlaceBid) {
      let { playerHand, dealerHand } = await generateHands();
      setIsPlaying(true);
      setPlayerBalance((value) => (value -= bid));
      setDealerBalance((value) => (value -= bid));
      setPlayerHand(playerHand);
      setHiddenDealerHand(dealerHand);
    }
  };

  const rewardWinner = (winner) => {
    const playerWon = winner.includes("player");
    if (playerWon) setPlayerBalance((value) => value + bid * 2);
    if (!playerWon) setDealerBalance((value) => value + bid * 2);
    if (playerWon) setHasWon(true);
  };

  const revealDealerHand = () => {
    setDealerHand(hiddenDealerHand);
    const { message, type, winner } = useBannerMessage({
      playerHand: playerHand,
      dealerHand: dealerHand,
    });

    rewardWinner(winner);
    banner[type](message, () => {
      setIsPlaying(false);
      resetPlay();
      setHasWon(false);
      if (playerBalance === 0 || dealerBalance === 0) {
        setIsGameOver(true);
      }
    });
  };

  const setupGame = useCallback(async () => {
    const { playerCurrentAmount, dealerCurrentAmount } = await getGameInfo();
    setAmount(playerCurrentAmount);
    setPlayerBalance(playerCurrentAmount);
    setPlayerCreditsLeft(playerCurrentAmount);
    setDealerBalance(playerCurrentAmount);
    setDealerCreditsLeft(dealerCurrentAmount);
  }, [getGameInfo]);

  useEffect(() => {
    if (!hasGameData) {
      (async function () {
        if (window.ethereum) {
          await setupGame();
          setHasGameData(true);
        }
      })();
    }
  }, [hasGameData, setHasGameData, setupGame]);

  useEffect(() => {
    if (playerBalance && !isPlaying && playerBalance !== amount) {
      setPlayerCreditsLeft(playerBalance);
    }
  }, [playerBalance, isPlaying, amount]);

  useEffect(() => {
    if (dealerBalance && !isPlaying && dealerBalance !== amount) {
      setDealerCreditsLeft(dealerBalance);
    }
  }, [amount, dealerBalance, isPlaying]);

  useEffect(() => {
    if (playerBalance === 0 || dealerBalance === 0) {
      setIsGameOver(true);
    }
  }, [dealerBalance, playerBalance]);

  return (
    <>
      <Head>
        <link rel="icon" href="./favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Lynxie is an NFT marketplace where people can come and upload and sell their NFTs."
        />
        <meta name="keywords" content="Lynxie, NFTs, NFT marketplace"></meta>
        <title>Poker on Chain | Home</title>
      </Head>
      {hasWonBet && <ConfettiShower />}
      <main className={`${styles["container"]} `}>
        <section className={`${styles["screen-warning"]} flex md:hidden`}>
          <div className={`bg-white`}>
            <div className={`${styles["title"]} bg-purple-700`}>
              <div
                className={`${styles["title"]} text-white text-center px-2 py-5 text-base`}
              >
                {`Oops... Looks like there's a problem 😢`}
              </div>
            </div>
            <div className={`${styles["body"]} flex p-10`}>
              <p className="text-xl">You can only play this game on PC</p>
            </div>
          </div>
        </section>

        {!isConnected && (
          <section className={`hidden md:flex ${styles["select-amount"]} `}>
            <div className={`bg-white`}>
              <div className={`${styles["title"]} bg-purple-700`}>
                <div
                  className={`${styles["title"]} text-white text-center px-2 py-5 text-base`}
                >
                  Please Connect to Meta Mask
                </div>
              </div>
              <div className={`${styles["body"]} flex py-5 justify-center`}>
                <WalletButton />
              </div>
            </div>
          </section>
        )}

        {isConnected && hasGameData && !amount && (
          <section className={`hidden md:flex ${styles["select-amount"]} `}>
            <div className={`bg-white`}>
              <div className={`${styles["title"]} bg-purple-700`}>
                <div
                  className={`${styles["title"]} text-white text-center px-2 py-5 text-base`}
                >
                  Select A Total Amount of Credits for this Game
                </div>
              </div>
              <div className={`${styles["body"]} flex `}>
                <span
                  onClick={() => handleSelectAmount(50)}
                  className="text-6xl w-1/2 p-10"
                >
                  $50
                </span>
                <span
                  onClick={() => handleSelectAmount(100)}
                  className="text-6xl w-1/2 p-10"
                >
                  $100
                </span>
              </div>
            </div>
          </section>
        )}

        {amount > 0 && (
          <section className="hidden md:block container">
            <div className="flex justify-between  xl:grid-cols-7">
              <div className="xl:col-span-5 mx-auto xl:mx-0">
                <div className="flex flex-wrap">
                  <div className="mt-10">
                    <div className="xl:hidden grid grid-cols-7  mb-4">
                      <div className={`${styles["play-btn -div"]} col-start-7`}>
                        {!isPlaying && (
                          <Button
                            className="text-xl"
                            onClick={() => setShouldOpenModal(true)}
                          >
                            {hasPlayed ? "Play Again" : "Play"}
                          </Button>
                        )}

                        {isPlaying && (
                          <Button
                            disabled={!bid}
                            className="text-xl"
                            onClick={revealDealerHand}
                          >
                            Continue
                          </Button>
                        )}
                      </div>
                    </div>
                    <div
                      className={`${styles["hand-title"]} px-5 py-4 text-2xl text-center`}
                    >
                      {`Dealer's Hand`}
                    </div>
                    <div className="flex justify-between">
                      {dealerHand.map((card, index) => (
                        <div key={card.id}>
                          <PokerCard card={card} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className=" "></div>
                </div>
                <div className="flex flex-wrap">
                  <div className="mt-5 w-full">
                    <div
                      className={`${styles["hand-title"]} px-5 py-4 text-2xl text-center`}
                    >
                      {`Player's Hand`}
                    </div>
                    <div className="flex justify-between">
                      {playerHand.map((card, index) => (
                        <div className={`col-span-1`} key={card.id}>
                          <PokerCard card={card} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-1"></div>
                </div>
              </div>
              <div className="xl:hidden">
                {shouldOpenModal && (
                  <OptionsModal
                    gameState={{
                      playerCreditsLeft,
                      dealerCreditsLeft,
                      placeBet,
                      revealDealerHand,
                      hasPlayed,
                      hasWonBet,
                      cannotSetBid,
                      isPlaying,
                      makeBid,
                      resetBid,
                      bid,
                    }}
                    isOpen={shouldOpenModal}
                    setIsOpen={setShouldOpenModal}
                  />
                )}
              </div>
              <div className="hidden xl:block xl:col-span-2 ">
                <div className={`${styles["bet-credits"]} `}>
                  <div className={`bg-white mt-10`}>
                    <div className={`${styles["title"]} bg-purple-700`}>
                      <div
                        className={`${styles["title"]} text-white text-center px-2 py-5 text-xl`}
                      >
                        Betting Credits
                      </div>
                    </div>
                    <div className={`${styles["body"]} text-center`}>
                      {!isPlaying && bid !== 0 && (
                        <button
                          className={`${styles["reset-betting-credits"]}`}
                          onClick={() => resetBid()}
                        >
                          Reset
                        </button>
                      )}

                      <span className="block text-5xl py-6">${bid}</span>
                      <div className="flex gap-x-1 2xl:gap-x-2 px-2 pb-2">
                        <div className="flex-1 ">
                          <Button
                            disabled={cannotSetBid}
                            className="flex items-center justify-center gap-x-1"
                            form="secondary"
                            onClick={() => makeBid(5)}
                          >
                            <span>$5 </span>
                            <PlusIcon />
                          </Button>
                        </div>
                        <div className="flex-1 ">
                          <Button
                            disabled={cannotSetBid}
                            className="flex items-center justify-center gap-x-1"
                            form="secondary"
                            onClick={() => makeBid(10)}
                          >
                            <span>$10</span>
                            <PlusIcon />
                          </Button>
                        </div>
                        <div className="flex-1 ">
                          <Button
                            disabled={cannotSetBid}
                            className="flex items-center justify-center gap-x-1"
                            form="secondary"
                            onClick={() => makeBid(20)}
                          >
                            <span>$20</span>
                            <PlusIcon />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${styles["total-credits"]} `}>
                  <div className={`bg-white mt-10`}>
                    <div className={`${styles["title"]} bg-purple-700`}>
                      <div
                        className={`${styles["title"]} text-white text-center px-2 py-5 text-xl`}
                      >
                        Total Credits
                      </div>
                    </div>
                    <div className={`${styles["body"]} p-4 text-center`}>
                      <div className="text-xl ">
                        <span className="mr-4 text-gray-500">
                          {`Dealer's Balance:`}
                        </span>
                        <span className="gradienttext font-medium">
                          ${dealerCreditsLeft}
                        </span>
                      </div>
                      <hr className="bg-gray-200" />
                      <div className="text-xl ">
                        <span className="mr-4 text-gray-500">
                          {`Player's Balance:`}
                        </span>
                        <span className="gradienttext font-medium">
                          ${playerCreditsLeft}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${styles["play-btn-div"]} mt-4`}>
                  {!isPlaying && (
                    <Button
                      disabled={!bid}
                      className="text-xl"
                      onClick={placeBet}
                    >
                      {hasPlayed ? "Play Again" : "Play"}
                    </Button>
                  )}

                  {isPlaying && (
                    <Button
                      disabled={!bid}
                      className="text-xl"
                      onClick={revealDealerHand}
                    >
                      Continue
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export default PlayPage;
