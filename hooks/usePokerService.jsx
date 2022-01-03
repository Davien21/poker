import { useEffect } from "react";
import {
  setPlayerAmount,
  getGameDetails,
  placeBet,
} from "../services/pokerService";
import { toast } from "react-toastify";
import Emitter from "../services/emitter";

function usePokerContract() {
  const getGameInfo = async () => {
    try {
      const gameDetails = await getGameDetails();
      console.log(gameDetails);
      return gameDetails;
    } catch (err) {
      toast.error("Failed to Load Game Data");
      console.log("Something went wrong", err);
    }
  };

  const setGameCredits = async (amount) => {
    Emitter.emit("OPEN_LOADER");
    try {
      await setPlayerAmount(amount);
      Emitter.emit("CLOSE_LOADER");
      return true;
    } catch (err) {
      toast.error("Failed to Select Credits");
      console.log("Something went wrong", err);
      Emitter.emit("CLOSE_LOADER");
    }
  };

  const placeBid = async (bid) => {
    console.log({ type: typeof bid, bid });
    Emitter.emit("OPEN_LOADER");
    try {
      await placeBet(bid);
      Emitter.emit("CLOSE_LOADER");
      return true;
    } catch (err) {
      toast.error(`Failed to Bet ${bid} Credits`);
      console.log("Something went wrong", err);
      Emitter.emit("CLOSE_LOADER");
    }
  };

  return { getGameInfo, setGameCredits, placeBid };
}

export default usePokerContract;
