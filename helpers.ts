import { MINUTE, SECOND } from "./types";

// Helpers
export const fromMsToS = (time: number) => {
  let minutes = Math.floor(time / MINUTE);
  let seconds = (time % MINUTE) / SECOND;
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};
