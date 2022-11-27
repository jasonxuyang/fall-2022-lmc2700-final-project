export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
export const TIME_PER_LEVEL = 5 * MINUTE;
export const TOTAL_LEVELS = 6;
export enum TIMER_STATUS {
  RUNNING = "RUNNING",
  PAUSED = "PAUSED",
  STOPPED = "STOPPED",
}

export interface IState {
  gameTime: number;
  currentLevel: number;
  studiousLevel: number;
  socialLevel: number;
  isPaused: boolean;
}
