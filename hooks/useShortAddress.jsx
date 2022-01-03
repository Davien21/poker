import { useEffect, useState } from "react";

const largeCutText = (text) =>
  `${text.substring(0, 8)}...${text.substring(text.length - 6)}`;

const smallCutText = (text) =>
  `${text.substring(0, 3)}...${text.substring(text.length - 2)}`;

function useShortAddress(address) {
  if (!address) address = "********";

  largeCutText(address);
}

export { useShortAddress };
