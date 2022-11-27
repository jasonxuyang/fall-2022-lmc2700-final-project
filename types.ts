export const SECOND = 1;
export const MINUTE = 60 * SECOND;
export const INITIAL_TIME_PER_LEVEL = 5;
export const TOTAL_LEVELS = 6;

export const INITAL_STATE = {
  level: 0,
  levelTime: 0,
  timePerLevel: INITIAL_TIME_PER_LEVEL,
  studiousLevel: 0,
  socialLevel: 0,
  isPaused: false,
};

export enum TIMER_STATUS {
  RUNNING = "RUNNING",
  PAUSED = "PAUSED",
  STOPPED = "STOPPED",
}

export interface IState {
  level: number;
  levelTime: number;
  timePerLevel: number;
  studiousLevel: number;
  socialLevel: number;
  isPaused: boolean;
}

export interface IEvent {
  gameTime: number;
}
