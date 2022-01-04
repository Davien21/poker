import { useEffect } from "react";
import { PlusIcon } from "../../../../assets/images";
import { Button } from "../../../../components";
import styles from "./options-modal.module.css";

function OptionsModal({ gameState, isOpen, setIsOpen }) {
  isOpen = true;
  let containerClass = `${styles["container"]}`;
  if (isOpen) containerClass += ` ${styles["active"]}`;
  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    if (!isOpen) document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, setIsOpen]);
  if (!gameState) return <div></div>;
  const {
    playerCreditsLeft,
    cannotSetBid,
    placeBet,
    revealDealerHand,
    isPlaying,
    makeBid,
    resetBid,
    bid,
    dealerCreditsLeft,
  } = gameState;

  return (
    <div className={containerClass} onClick={closeModal}>
      <div
        className={`${styles["modal-body"]}`}
        onClick={(e) => e.stopPropagation()}
      >
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
                <span className="mr-4 text-gray-500">{`Dealer's Balance:`}</span>
                <span className="gradienttext font-medium">
                  ${dealerCreditsLeft}
                </span>
              </div>
              <hr className="bg-gray-200" />
              <div className="text-xl ">
                <span className="mr-4 text-gray-500">{`Player's Balance:`}</span>
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
              onClick={() => {
                placeBet();
                closeModal();
              }}
            >
              Place Bet
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
  );
}

export default OptionsModal;
